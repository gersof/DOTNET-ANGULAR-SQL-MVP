# Mínimo producto viable con Dotnet Core, Angular y MS SQL

También se usan librerias como Swagger y Entity Framework para manipular la base de datos desde nuestra App, usamos Nswag para generar los servicios de angular y ahorrarnos tiempo, tambien utilizamos bootstrap y NgBoostrap.

Este es el enlace del curso completo como lista de reproducción https://www.youtube.com/watch?v=lsSQZXo09zA&list=PL5oPNTwQiIK2FCG0asIBh_izpJHEfK99X

NO olvides!!! suscribirte a nuestro canal en youtube https://www.youtube.com/channel/UCKBlXeFynTAUayZwC0ATOXg y seguirnos en facebook https://www.facebook.com/devtygers

#Prerrequisitos:
* Tener instalado en la maquina el motor de SQL Express 2019 o superior.
* Tener instalado el dotnet core framework sino lo tiene puedes descargarlo de acá https://dotnet.microsoft.com/download recuerden bajr el SDK y el Runtime en este proyecto se trabaja con la version 3.1.
* Necesitas tener instalado in IDE  ya sea Visual Studio y/o visual studio code(este último es multiplataforma es decir correr en Windows/Linux/MacOX) si usted tiene una maquina con muy pocos recursos es decir menos de 6GB de ram y un procesador bajo, le recomiendo si o si utilizar visual studio code.
* Una vez instalado el dotnet core  instalar el entity  framework con este comando dotnet tool install --global dotnet-ef
para más información sobre entity framework core https://docs.microsoft.com/es-es/ef/core/miscellaneous/cli/dotnet
* Para descargar el sql server el motor acá https://www.microsoft.com/es-es/sql-server/sql-server-downloads y el editor https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15


#Pasos:
* Crear una base de datos en sql server  con el nombre que guste por ejemplo "InvoiceDb" y ejecutar este script https://raw.githubusercontent.com/gersof/DOTNET-ANGULAR-SQL-MVP/master/DB/InvoiceDb.sql
* Si deseas crear un proyecto web (Server render) Abrir el visual studio -> Proyecto  Asp.Net Core Web Application -> Model View Controller
* Si deseas crear un proyecto web api Abrir el visual studio -> Proyecto  Asp.Net Core Web Application -> API

 Si deseas crear el scaffold desde las tablas de base de datos o sea DataBase Fisrt debes hacer lo siguiente:
* Agregar las siguientes librerias via Nuget **Microsoft.EntityFrameworkCore.Design** y **Microsoft.EntityFrameworkCore.SqlServer**
* Compilar luego de haber instalado las librerias
* Ir a la raiz del proyecto es decir donde esté el archivo .csproj y ejecuar el comando en una sola linea
**dotnet ef dbcontext scaffold "Server=localhost,1433;Initial Catalog=InvoiceDb;Persist Security Info=False;User ID=sa;Password=Abc.123456;MultipleActiveResultSets=False;TrustServerCertificate=False;Connection Timeout=30;" Microsoft.EntityFrameworkCore.SqlServer -o Models**

Donde **localhost** es la dirección del servidor, **1433** es el número del puerto, el valor de Catalog es el nombre de la base de datos en este caso **InvoiceDb**, User Id
 es el usuario en este caso **sa** y password es la contraseña de ese usuario en este caso **Abc.123456**
 
Agregar al archivo **appsettings.json** :
"ConnectionStrings": {
    "InvoiceDb": "Server=localhost,1433;Initial Catalog=InvoiceDb;Persist Security Info=False;User ID=sa;Password=Abc.123456;MultipleActiveResultSets=False;TrustServerCertificate=False;Connection Timeout=30;"
  },
  
 
 En la clase **startup.cs**  en el método **ConfigureServices** 
 porner lo siguiente al final del método:
            string conn = Configuration.GetConnectionString("InvoiceDb");
            services.AddDbContext<InvoiceDbContext>(options =>
                        options.UseSqlServer(conn));
 
#NOTA 1
si usted nombró la base de datos diferente, el DbContext generado NO se llamará InvoiceDbContext asi que debe corregirlo y es igual si usted modificó la cadena de conexion.


Recuerda suscribirte a nuestro canal en youtube https://www.youtube.com/channel/UCKBlXeFynTAUayZwC0ATOXg y seguirnos en facebook https://www.facebook.com/devtygers
