<?php

if($_GET){
    $data = listAll();
    echo json_encode($data);exit;
}

if($_POST){
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    if($nome == ""){
        echo json_encode(['status'=>false,'msg'=>'Preencha o campo nome']);exit;
    }

    if($email == ""){
        echo json_encode(['status'=>false,'msg'=>'Preencha o campo email']);exit;
    }

    if($telefone == ""){
        echo json_encode(['status' =>false,'msg'=>'Preencha o campo telefone']);exit;
    }

    $id = save($_POST);
    if($id){
        $data = find($id);
        echo json_encode(['status'=>true,'msg'=>"Sucesso! id: {$id}","contato"=>$data]);exit;
    }else{
        echo json_encode(['status'=>false,'msg'=>'Erro!']);exit;
    }
}

function conn(){
    $conn = new \PDO("mysql:host=localhost;dbname=ajax_jquery","root","");
    return $conn;
}

function save($data){
    $db = conn();
    $query = "INSERT INTO contatos(nome,email,telefone) values (:nome,:email,:telefone)";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':nome',$data['nome']);
    $stmt->bindValue(':email',$data['email']);
    $stmt->bindValue(':telefone',$data['telefone']);
    $stmt->execute();
    return $db->lastInsertId();
}

function listAll(){
    $db = conn();
    $query = "SELECT * FROM contatos ORDER BY id DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function find($id){
    $db = conn();
    $query = "SELECT * FROM contatos WHERE id=:id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id',$id);
    $stmt->execute();
    return $stmt->fetch(\PDO::FETCH_ASSOC);
}