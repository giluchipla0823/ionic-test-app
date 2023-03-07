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

### Página de Búsqueda de imágenes
- Se visualiza una lista de imágenes y un buscador que permitir filtrar por los campos: id, title y text.
- Se puede realizar la acción "Pull to refresh" para reiniciar la lista.
- Se puede realizar "Infinite scroll" para cargar más imágenes. 
- Las imágenes se cargan mediante el componente "app-shell-image", el cual se encarga de mostrar la imagen una vez cargada con una animación. En caso que haya ocurrido un error, se muestra un mensaje de error.
