CREATE PROCEDURE dba.proc_vendeur(in vendeur char(10))

RESULT (identite varchar(255))

BEGIN
  call sa_set_http_header( 'Content-Type', 'text/html' );

  Set identite =  string('<p><strong>v01</strong> :',   select vendNom ||' '||vendPrenom ||', ' || tbVendeurs.vilId  ||' '|| vilLib
    from tbVendeurs natural join tbVilles
    Where vendId = vendeur; , '</p>');

END
