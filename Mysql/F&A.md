
## Q：在进行数据库操作时，如何屏蔽依赖检测进行数据删除

    set foreign_key_checks=0 #屏蔽依赖检测进行数据库删除操作

## Q：清除数据库表

    SET FOREIGN_KEY_CHECKS = 0; 
    SET @tables = NULL;
    SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables
      FROM information_schema.tables 
      WHERE table_schema = 'database_name'; -- specify DB name here.

    SET @tables = CONCAT('DROP TABLE ', @tables);
    PREPARE stmt FROM @tables;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    SET FOREIGN_KEY_CHECKS = 1; 

## Q：how mysqldump only dump database data

    #dump database data only
    mysqldump --no-create-info

    #dump database skip trigger
    --skip-triggers

## Q：创建数据库的时候如何指定数据库

    CREATE DATABASE mydatabase CHARACTER SET utf8 COLLATE utf8_general_ci;
