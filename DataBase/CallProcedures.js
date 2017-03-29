
--InsertNewEntity--Insere uma nova entidade na tabela entity, consoante o type(1,2) vai ser student ou teacher e inserir os dados na respetiva tabela, student ou teacher
CALL InsertNewEntity('Name',type,'extid');
--exemplo
CALL InsertNewEntity('Teste',1,'0001');


--InsertNewUser--

CALL InsertNewUser('UserTeste','teste','teste',1,'0001');


--