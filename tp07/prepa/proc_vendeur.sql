CREATE PROCEDURE DBA.proc_vendeur(in vendeur char(10))

RESULT (identite varchar(255))

BEGIN
  call sa_set_http_header( 'Content-Type', 'text/html' );

    select string('<p><strong>v01</strong> :', vendNom ||' '||vendPrenom ||', ' || tbVendeurs.vilId  ||' '|| vilLib, '</p>')
    from tbVendeurs natural join tbVilles
    Where vendId = vendeur; 

END
