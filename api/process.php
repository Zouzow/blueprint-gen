<?php

header("Content-Type: application/json");

$data = file_get_contents("php://input");
$data = json_decode($data, true);

/*
Goal :

"parent" => [
  "child1" => 'file',
  "child2" => 'file',
]

"touch parent/child1 && touch parent/child2"

child1 => file ---- touch parent/child1
child2 => file ---- touch parent/child2

*/

function browseTree($currentDepth, $path = "") {
  $commands = [];

  foreach ($currentDepth as $key => $value) {
    if ($path === "") $currentPath = $key;
    else $currentPath = $path . "/" . $key;

    if ($value === 'file') {
      $commands[] =  "touch -p " . $currentPath;
    } else {
      $commands = array_merge($commands, browseTree($value, $currentPath));
    }
  }
  return $commands;
};

try {
  $commands = browseTree($data);
  $script = implode(" && ", $commands);
  echo json_encode([
    "success" => true,
    "data" => $script
  ]);
  exit();

} catch (Exception $e) {
  echo json_encode([
    "success" => false,
    "error" => $e
  ]);
  exit();
}