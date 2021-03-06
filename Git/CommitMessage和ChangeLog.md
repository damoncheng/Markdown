[参考连接 : http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 

## Commit message 的格式 

header body footer

    <type>(<scope>): <subject>  
    // 空一行
    <body>
    // 空一行
    <footer>

### header 

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

#### type

type用于说明 commit 的类别，只允许使用下面7个标识。

    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动
    
#### scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
    
#### subject

subject是 commit 目的的简短描述，不超过50个字符
    
    以动词开头，使用第一人称现在时，比如change，而不是changed或changes
    第一个字母小写
    结尾不加句号（.）
    
### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

    More detailed explanatory text, if necessary.  Wrap it to 
    about 72 characters or so. 

    Further paragraphs come after blank lines.

    - Bullet points are okay, too
    - Use a hanging indent
    
有两个注意点。

（1）使用第一人称现在时，比如使用change而不是changed或changes。

（2）应该说明代码变动的动机，以及与以前行为的对比。

### Footer

Footer 部分只用于两种情况

#### 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

    BREAKING CHANGE: isolate scope bindings definition has changed.

        To migrate the code follow the example below:

        Before:

        scope: {
          myAttr: 'attribute',
        }

        After:

        scope: {
          myAttr: '@',
        }

        The removed `inject` wasn't generaly useful for directives so there should be no code using it.

#### 关闭 Issue

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

    Closes #234
    
也可以一次关闭多个 issue 。

    Closes #123, #245, #992
    
### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

    revert: feat(pencil): add 'graphiteWidth' option

    This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
    
Body部分的格式是固定的，必须写成This reverts commit &lt;hash>.，其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。

## Commitizen

Commitizen是一个撰写合格 Commit message 的工具。

安装命令如下。

    $ npm install -g commitizen
    
然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

    $ commitizen init cz-conventional-changelog --save --save-exact

以后，凡是用到`git commit`命令，一律改为使用`git cz`。这时，就会出现选项，用来生成符合格式的 Commit message。


## validate-commit-msg

`validate-commit-msg` 用于检查 **Node** 项目的 **Commit message** 是否符合格式。

详情看参考文献

## 生成 Change log

如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成（例1，例2，例3）。

生成的文档包括以下三个部分。

详情看参考文献


    

