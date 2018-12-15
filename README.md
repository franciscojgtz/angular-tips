# angular-tips
---
![Demo](https://media.giphy.com/media/9PgpT2NKZOApkcOmfF/giphy.gif)

angular-tips is a tip tracker app based on AngularJS-- handy for anyone who works at a restaurant or receives tip income.

## Based on
---
angular-tips is a combination of the following projects:
[AngularJS Authentication](http://www.angularcode.com/user-authentication-using-angularjs-php-mysql) and
[AngularJS Restful API](http://www.angularcode.com/product-inventory-management-using-angularjs-mysql-and-php-restful-api)

# Instructions
1- Clone this repository

2- Create a MySQL database in PHPmyAdmin

3- Create the following tables

```
--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
CREATE TABLE IF NOT EXISTS `tips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `tip` double NOT NULL,
  `tipout` double NOT NULL,
  `sales` double NOT NULL,
  `hoursworked` double NOT NULL,
  `hourlypay` double NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

```

4- Navigate to API/vi and create the file: config.php

5- In config.php add the following code:
```
<?php
/**
 * Database configuration
 */
define('DB_USERNAME', REPLACE_WITH_USERNAME);
define('DB_PASSWORD', REPLACE_WITH_PASSWORD);
define('DB_HOST', REPLACE_WITH_HOST);
define('DB_NAME', REPLACE_WITH_DATABASE);

?>
```

Make sure to replace the indicated code.



