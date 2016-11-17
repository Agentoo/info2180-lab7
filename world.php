<?php
  $hostname = getenv('IP'); 
  $user = getenv('C9_USER'); 

  mysql_connect($hostname,$user);
  mysql_select_db("world");

  $LOOKUP = $_REQUEST['lookup'];
  $ALL = $_REQUEST['all'];
  $FORMAT = $_REQUEST['format'];
  
  if($ALL==true and $LOOKUP==null){

    $sql_all = "SELECT name,head_of_state FROM countries";
    $r_all = mysql_query($sql_all); 
  
    if($FORMAT == 'xml'){
      header("Content-type: text/xml");
      $strxml = '<countrydata>'; 

      while ($rows = mysql_fetch_array($r_all)){
        $strxml .= '<country>';
        $strxml .= '<name>'.utf8_encode($rows["name"]).'</name>';
        $strxml .= '<ruler>'.utf8_encode($rows["head_of_state"]).'</ruler>';
        $strxml .= '</country>';
      } 
    
      $strxml .= '</countrydata>';
      $xml =  new SimpleXMLElement($strxml);
      echo $xml->asXML();
    }
    else{
      while ($rows = mysql_fetch_array($r_all)) { 
        ?><li> <?php echo $rows["name"]; ?>, ruled by <?php echo $rows["head_of_state"]; ?> </li><?php
      }
    }
  }
  else{
    $sql_lkup = "SELECT * FROM countries WHERE name LIKE '%$LOOKUP%'";      
    $r_lkup = mysql_query($sql_lkup); 
   
    while ($row = mysql_fetch_array($r_lkup)) { 
      ?><li> <?php echo $row["name"]; ?>, ruled by <?php echo $row["head_of_state"]; ?></li><?php
    }
  }
?>