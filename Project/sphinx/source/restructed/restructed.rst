=============================
Restructed summary
=============================

..
    This is a study restructedText based on sphinx   


Inline Markup
============================

    *text*     #emphasis(italics)

    **text**   #string emphasis(boldface)

    ``text``   #code sample

Lists and Quote-like blocks
============================

    * This is a bulleted list.
    * It has two items, the second item uses two lines.

    1. This is a numbered list.
    2. It has two items too.

    #. This is a numbered list.
    #. It has two items too.

    * this is
    * a list

        * with a nested list
        * and some subitems

    * and here the parent list continues

    term (up to a line of text)

        Definition of the term, which must be indented

        and can even consist of multiple paragraphs

    next term
        Description.

    | These lines are
    | broken exactly like in
    | the source file.

Source Code
============================

This is a normal text paragraph. The next paragraph is a code sample::

    It is not processed in any way, except
    that the indentation is removed.

    It can span multiple lines.

This is a normal text paragraph again.

Tables
============================

====== ====== ======
A      B      C
====== ====== ======
False  False  False
True   True   False
====== ====== ======

Hperlinks
============================

This is a paragraph that contains `a link`_.

.. _a link : http://www.baidu.com/

Directives
============================

a directive is a generic block of explicit markup. Besides roles, it is one of the extension mechanism 
of reST, and Sphinx makes heavy use of it.

a directive consists of a **name**, **arguments**, **options** and **content**.


.. function:: foo(x)
              foo(y, z)

   :module: some.module.name

   Return a line of text input from the user

Images
===========================

.. image:: images/picture.jpeg

Footnotes
===========================

use `[#name]_` to mark the footnote location. and add the footnote body at the bottom of the document 
after a "Footnotes" rubric heading.

Lorem ipsum [#f1]_ dolor sit amet ... [#f2]_

Citations
===========================

Lorem ipsum [Ref]_ dolor sit amet.

.. [Ref] Book or article reference, URL or whatever.

Substitutions
===========================

|name| is replaced

|caution|

.. |caution| image:: images/picture.jpeg

.. |name| replace:: replacement *text*


.. rubic:: Footnotes

.. [#f1] Text of the first footnote.
.. [#f2] Text of the second footnote.
