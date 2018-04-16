<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/

$app->get('/session', function() {
    global $db;
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    $data= json_decode($app->request->getBody());
	$mandatory = array('email', 'password');
	require_once 'passwordHash.php';//to hash the pasword
	$password = $data->password;
	$email = $data->email;
	global $db;
	
	$isUserExists = $db->select("users", "uid, name, password, email, created, modified", array('email'=>$email));
	if($isUserExists["data"] != null){
		$rows = $isUserExists;
		$myUser = $rows["data"][0];
		
		if(passwordHash::check_password($myUser["password"],$password)){
			$rows["status"]="success";
			$rows["message"] = 'Logged in successfully.';
			if (!isset($_SESSION)) {
				session_start();
			}
			$_SESSION['uid'] = $myUser['uid'];
			$_SESSION['email'] = $email;
			$_SESSION['name'] = $myUser['name'];
		} else {
            $rows['status'] = "error";
            $rows['message'] = 'Login failed. Incorrect credentials';
        }
	} else{
		$rows["status"]="error";
		$rows["message"] = 'No such user is registered';
	}
    echoResponse(200, $rows);
});

$app->get('/logout', function() {
	global $db;
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/signUp', function() use ($app) { 
    $data = json_decode($app->request->getBody());
	unset($data->{'password2'}); 
	$email = $data->email;
	$name = $data->name;
	$password = $data->password;
    $mandatory = array('email', 'password', 'name');
	require_once 'passwordHash.php';//to hash the pasword
	$data->password = passwordHash::hash($password);		
    global $db;
	$isUserExists = $db->select("users", "uid", array('email'=>$email));
	if($isUserExists["data"] == null){
		$rows = $db->insert("users", $data, $mandatory);
		if($rows["data"] != 0){
			$response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $rows["data"];
            if (!isset($_SESSION)) {
                session_start();
            }
			$_SESSION['uid'] = $response["uid"];
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
		} else {
			$response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
		}
	}else {
		$rows["status"] = "error";
        $rows["message"] = "An user with the provided email exists!";
        echoResponse(201, $rows);
	}
});

// Products
$app->get('/allTips', function() { 
    global $db;
    $rows = $db->select("tips","id,userid,tip,tipout,sales,hoursworked,hourlypay,created,modified",array());//array('email'=>$email)
    echoResponse(200, $rows);
});

$app->post('/addTip', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('date');
    global $db;
    $rows = $db->insert("tips", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Tip added successfully.";
    echoResponse(200, $rows);
});

$app->post('/tips', function() use ($app) { 
    $data = json_decode($app->request->getBody());
	$uid = $data->userid;
	global $db;
	$rows = $db->select("tips","id,date, userid,tip,tipout,sales,hoursworked,hourlypay,created,modified",array('userid'=>$uid));
    echoResponse(200, $rows);
});

$app->put('/tips/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array('date');
    global $db;
    $rows = $db->update("tips", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Tip information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/tips/:id', function($id) { 
    global $db;
    $rows = $db->delete("tips", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Tip removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>