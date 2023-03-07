# ionic-test-app
Ionic 6 - Test App

# Instalar paquetes NPM
npm install

# Iniciar servidor local
ionic serve

# Funcionalidades
### Página de Inicio de sesión
- Se visualiza el formulario para iniciar sesión con una animación, el cual, tiene como campos requeridos: email y password.
- Para iniciar sesión es importante usar las credenciales: 

**email: admin@admin.com**

**password: secret**


![login-mobile](https://user-images.githubusercontent.com/22506256/223359313-f290be6c-c3d8-4d9f-b389-5715955ec0a6.png)

![login-tablet](https://user-images.githubusercontent.com/22506256/223359361-7a1fa3f6-2c98-4d1c-be06-c2d7f4936376.png)



### Página de Búsqueda de imágenes
- Se visualiza una lista de imágenes y un buscador que permitir filtrar por los campos: id, title y text.
- Se puede realizar la acción "Pull to refresh" para reiniciar la lista.
- Se puede realizar "Infinite scroll" para cargar más imágenes. 
- Las imágenes se cargan mediante el componente "app-shell-image", el cual se encarga de mostrar la imagen una vez cargada con una animación. En caso que haya ocurrido un error, se muestra un mensaje de error.


![home-mobile](https://user-images.githubusercontent.com/22506256/223359489-d431de4c-80c3-4ef2-9eee-eed96fe2cd23.png)

![home-tablet](https://user-images.githubusercontent.com/22506256/223359536-a654259f-c724-4215-9eff-0891b7f2b08c.png)





