## Git init repository of server ##

git init

git commit -a 
(git commit -a -m "Init Commit")

git branch : show current branch

git status : show current working tree status

git log : show commit log


##Git clone by ssh ##

git clone ssh://IP/GIT_PATH

## Git push to remote ##

###  add denyCurrentBranch to server ###

通常在用git clone了remote端（服务器）的git仓库后，再进行了自己一系列修改后，会将自己测试后稳定的状态push到remote端，以更新源仓库，使 其他人在pull的时候得到自己的修改。但是在git push的时候会经常出现如下的错误提示。

 remote: error: refusing to update checked out branch: refs/heads/master remote: error: By default, updating the current branch in a non-bare repository remote: error: is denied, because it will make the index and work tree inconsistent remote: error: with what you pushed, and will require ‘git reset –hard’ to match remote: error: the work tree to HEAD. remote: error: remote: error: You can set ‘receive.denyCurrentBranch’ configuration variable to remote: error: ‘ignore’ or ‘warn’ in the remote repository to allow pushing into remote: error: its current branch; however, this is not recommended unless you remote: error: arranged to update its work tree to match what you pushed in some remote: error: other way. remote: error: remote: error: To squelch this message and still keep the default behaviour, set remote: error: ‘receive.denyCurrentBranch’ configuration variable to ‘refuse’. 

根据上面所报的信息，它的意思就是默认情况下，git不允许用push操作更新non-bare的仓库，因为这样的操作会导致remote仓库的索引 （index）和工作树（work tree）与你push的不一致，此时需要通过‘git reset –hard’操作来使得工作树与HEAD索引相匹配。 可以通过在remote端，设置git的配置文件（.git/config），在其中添加如下内容： [receive]

[receive]
denyCurrentBranch = ignore

这样就可以通过git push提交自己的稳定更新，要想在push后在remote端看到更新的效果，执行git reset –hard即可。

### git push on client ###

git push origin master

### git sync working tree with HEAD index ###

git reset --hard

note : I think --merge is better, I will demonstration it.


<hr />

##Object database and index files ##

### Object database ###

- It turn out that every **object** in in the Git history is stored under a 40-digit hex name. That name is the SHA-1 hash of the object's contents;

- we can ask Git about this **particular object** with the **cat-file** command.(argument -t is type, check the type of object.)
 

           $ git cat-file -t 54196cc2
           commit
           $ git cat-file commit 54196cc2
           tree 92b8b694ffb1675e5975148e1121810081dbdffe
           author J. Bruce Fields <bfields@puzzle.fieldses.org> 1143414668 -0500
           committer J. Bruce Fields <bfields@puzzle.fieldses.org> 1143414668 -0500

           initial commit

-  You can examine the contents of any tree using **ls-tree**:

	A tree can refer to one or more **"blob"** objects, **each corresponding to a file**. In addition, a **tree** can also refer to other **tree objects**

	the object that Git named in its response to the initial tree was a tree with
    a **snapshot** of the directory state that was recorded by the first commit

           $ git ls-tree 92b8b694
           100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad    file.txt

 	A "blob" is just file data, which we can also examine with cat-file:

           $ git cat-file blob 3b18e512
           hello world


	 All of these objects are stored under their SHA-1 names inside the Git directory:

           $ find .git/objects/
           .git/objects/
           .git/objects/pack
           .git/objects/info
           .git/objects/3b
           .git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
           .git/objects/92
           .git/objects/92/b8b694ffb1675e5975148e1121810081dbdffe
           .git/objects/54
           .git/objects/54/196cc2703dc165cbd373a65a4dcf22d50ae7f7
           .git/objects/a0
           .git/objects/a0/423896973644771497bdc03eb99d5281615b51
           .git/objects/d0
           .git/objects/d0/492b368b66bdabf2ac1fd8c92b39d3db916e59
           .git/objects/c4
           .git/objects/c4/d59f390b9cfd4318117afde11d601c1085f241


       and the contents of these files is just the compressed data plus a header identifying their length and their type. The type is either **a blob**, **a tree**, **a commit**, or **a tag**.


- The simplest commit to find is the HEAD commit, which we can find from .git/HEAD:

		 $ cat .git/HEAD
           ref: refs/heads/master 

 As you can see, this tells us **which branch we’re currently on**, and it tells us this by naming a file under the **.git directory, which itself contains a SHA-1 name referring to a commit object**, which we can examine with cat-file:

 		   $ cat .git/refs/heads/master
	       c4d59f390b9cfd4318117afde11d601c1085f241
	       $ git cat-file -t c4d59f39
	       commit
	       $ git cat-file commit c4d59f39
	       tree d0492b368b66bdabf2ac1fd8c92b39d3db916e59
	       parent 54196cc2703dc165cbd373a65a4dcf22d50ae7f7
	       author J. Bruce Fields <bfields@puzzle.fieldses.org> 1143418702 -0500
	       committer J. Bruce Fields <bfields@puzzle.fieldses.org> 1143418702 -0500
	
	       add emphasis

The "tree" object here refers to the new state of the tree:

		   $ git ls-tree d0492b36
           100644 blob a0423896973644771497bdc03eb99d5281615b51    file.txt
           $ git cat-file blob a0423896
           hello world!

and the "parent" object refers to the previous commit:           

  		   $ git cat-file commit 54196cc2
           tree 92b8b694ffb1675e5975148e1121810081dbdffe
           author J. Bruce Fields <bfields@puzzle.fieldses.org> 1143414668 -0500
           committer J. Bruce Fields <bfields@puzzle.fieldses.org> 1143414668 -0500

           initial commit

Besides blobs, trees, and commits, the only remaining type of object is a "tag".

#### so now we know how Git uses the object database to represent a project's history  ####

-  "commit" objects refer to **"tree"** objects representing the **snapshot** of a directory tree at a particular point in the history, and refer to "parent" commits to show how they’re connected into the project history.

- "tree" objects represent the state of a single directory, associating directory names to **"blob"** objects containing file data and **"tree"** objects containing subdirectory information.

- "blob" objects contain file data without any other structure.

- References to commit objects at the head of each branch are stored in files under **.git/refs/heads/**.

- The name of the current branch is stored in **.git/HEAD**.


   Note, by the way, that lots of commands take a tree as an argument. But as we can see above, a tree can be referred
   to in many different ways—by the SHA-1 name for that tree, by the name of a commit that refers to the tree, by the
   name of a branch whose head refers to that tree, etc.--and most such commands can accept any of these names.


   In command synopses, the word "tree-ish" is sometimes used to designate such an argument.


### The INDEX FILE ###

 The primary tool we’ve been using to create commits is git-commit -a, which creates a commit including every change you’ve made to your working tree. **But what if you want to commit changes only to certain files? Or only certain
 changes to certain files?**

If we look at the way commits are created under the cover, we’ll see that there are more **flexible ways** creating commits.

Continuing with our test-project, let’s modify file.txt again:

    $ echo "hello world, again" >>file.txt


but this time instead of immediately making the commit, let’s take an intermediate step, and ask for **diffs along the way to keep track of what’s happening**:

	   $ git diff
	   --- a/file.txt
	   +++ b/file.txt
	   @@ -1 +1,2 @@
	    hello world!
	   +hello world, again
	   $ git add file.txt
	   $ git diff

The last diff is empty, but no new commits have been made, and the head still doesn’t contain the new line:

	   $ git diff HEAD
	   diff --git a/file.txt b/file.txt
	   index a042389..513feba 100644
	   --- a/file.txt
	   +++ b/file.txt
	   @@ -1 +1,2 @@
	    hello world!
	   +hello world, again

So **git diff** is comparing against something **other than the head**. The thing that **it’s comparing against is actually the index file**, which is stored in **.git/index** in a binary format, but whose contents we can examine with **ls-files**:


       $ git ls-files --stage
       100644 513feba2e53ebbd2532419ded848ba19de88ba00 0       file.txt
       $ git cat-file -t 513feba2
       blob
       $ git cat-file blob 513feba2
       hello world!
       hello world, again


So what our **git add** did was store a new **blob** and then put a reference to it in the index file. If we modify the file again, we’ll see that the new modifications are reflected in the **git diff** output:

		   $ echo 'again?' >>file.txt
           $ git diff
           index 513feba..ba3da7b 100644
           --- a/file.txt
           +++ b/file.txt
           @@ -1,2 +1,3 @@
            hello world!
            hello world, again
           +again?


With the right arguments, **git diff** can also show us the difference between the working directory and the last commit, or between the index（--cached） and the last commit:

           $ git diff HEAD
           diff --git a/file.txt b/file.txt
           index a042389..ba3da7b 100644
           --- a/file.txt
           +++ b/file.txt
           @@ -1 +1,3 @@
            hello world!
           +hello world, again
           +again?
           $ git diff --cached
           diff --git a/file.txt b/file.txt
           index a042389..513feba 100644
           --- a/file.txt
           +++ b/file.txt
           @@ -1 +1,2 @@
            hello world!
           +hello world, again

At any time, we can create a new commit using **git commit** (without the "-a" option), and **verify that the state committed only includes the changes stored in the index file**, not the additional change that is still only in our working tree:

 		   $ git commit -m "repeat"
           $ git diff HEAD
           diff --git a/file.txt b/file.txt
           index 513feba..ba3da7b 100644
           --- a/file.txt
           +++ b/file.txt
           @@ -1,2 +1,3 @@
            hello world!
            hello world, again
           +again?

Finally, it’s worth looking at the effect of git add on the index file:

           $ echo "goodbye, world" >closing.txt
           $ git add closing.txt

The effect of the git add was to add one entry to the index file:

           $ git ls-files --stage
           100644 8b9743b20d4b15be3955fc8d5cd2b09cd2336138 0       closing.txt
           100644 513feba2e53ebbd2532419ded848ba19de88ba00 0       file.txt

And, as you can see with cat-file, this new entry refers to the current contents of the file:

		   $ git cat-file blob 8b9743b2
           goodbye, world

The **"status" command** is a useful way to get a quick summary of the situation:

           $ git status
           # On branch master
           # Changes to be committed:
           #   (use "git reset HEAD <file>..." to unstage)
           #
           #       new file: closing.txt
           #
           # Changes not staged for commit:
           #   (use "git add <file>..." to update what will be committed)
           #
           #       modified: file.txt

**Since the current state of closing.txt is cached in the index file, it is listed as "Changes to be committed". Since file.txt has changes in the working directory that aren’t reflected in the index, it is marked "changed but not updated". At this point, running "git commit" would create a commit that added closing.txt (with its new contents), but that didn’t modify file.txt.**

Also, note that a bare git diff shows the changes to file.txt, but not the addition of closing.txt, because the version of closing.txt in the index file is identical to the one in the working directory.

**In addition to being the staging area for new commits, the index file is also populated from the object database when checking out a branch, and is used to hold the trees involved in a merge operation. See gitcore-tutorial(7) and the
relevant man pages for details.**

