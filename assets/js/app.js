document.addEventListener("DOMContentLoaded", () => {
  start();
});

const example_tree = {
  "api" : {
    "process.php" : "file",
  },
  "assets" : {
    "css" : {"style.css" : "file"},
    "js" : {"app.js" : "file"}
  },
  "config" : {
    "database.example.php" : "file",
    "database.php" : "file",
  },
  "sql" : { "structure.sql" : "file"},
  ".gitignore" : "file",
  "index.php" : "file",
  "LICENSE" : "file",
  "README.md" : "file",
  "task.md" : "file"
}

const example_list = [
  "api/process.php", "assets/css/style.css", "assets/js/app.js", "config/database.example.php", "config/database.php", "sql/structure.sql", ".gitignore", "index.php", "LICENSE", "README.md", "task.md"
]

function start() {
  const json_tree = JSON.stringify(example_tree);
  send_structure_tree(json_tree);
  // send_structure_list(example_list);
}

async function send_structure_tree(json_tree) {
  const promise = await fetch("./api/process.php", {
    method: 'POST',
    body: 'json_tree'
  });
  try {
    const response = await promise.json();
  } catch (e) {
    console.error(e);
    return;
  }

  if (response.ok) {
    console.log(response['data']);
  } else {
    console.log("erreur catch car response non ok")
  }
}