CREATE PROCEDURE dba.objectifsVendeurs(in codePostal smallint, in moisObjectif smallint, in montantMin smallint)

RESULT(id char(3), nom char(50), prenom char(30), mois tinyint, objectif integer)

BEGIN

select V.vendId, vendNom, vendPrenom, moisId, objChiffre
from tbVendeurs as V natural join tbObjectifs
where vilId = codePostal and moisId = moisObjectif and objChiffre > montantMin;

END
