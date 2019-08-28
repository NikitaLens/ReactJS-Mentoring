$container = (echo $(docker ps) | Select-String -Pattern "mentoring-node-app")
$id = ($container -split " ")[0]

docker exec -ti $id sh
