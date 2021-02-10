@ECHO off

SET /p id="Introduce la talla de zapatos que buscas en YOKONO: "

ECHO Buscando zapatos de la talla %id% ....

node shoesScraper %id%

PAUSE