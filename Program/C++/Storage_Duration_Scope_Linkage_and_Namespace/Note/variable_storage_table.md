## Table 9.1. The Five Kinds of Variable Storage ##

<style>
    table th,td {
        padding-left:20px;
        padding-right:20px;
    }
</style>

<table>
    <thead>
        <tr>
            <th>Storage Description</th>
            <th>Duration</th>
            <th>Scope</th>
            <th>Linkage</th>
            <th>How Declared</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>automatic</td>
            <td>automatic</td>
            <td>block</td>
            <td>none</td>
            <td>in a block (optionally with the keyword auto)</td>
        </tr>
         <tr>
            <td>register</td>
            <td>automatic</td>
            <td>block</td>
            <td>none</td>
            <td>in a block with the keyword register</td>
        </tr>
        <tr>
            <td>static with no linkage</td>
            <td>static</td>
            <td>block</td>
            <td>none</td>
            <td>in a block with the keyword static</td>
        </tr>
        <tr>
            <td>static with external linkage</td>
            <td>static</td>
            <td>file</td>
            <td>external</td>
            <td>outside of all functions</td>
        </tr>
         <tr>
            <td>static with internal linkage</td>
            <td>static</td>
            <td>file</td>
            <td>internal</td>
            <td>outside of all functions with the keyword static</td>
        </tr>
    </tbody>
</table>


