# Commercency
Ecommerce, simple

## Como la uso?
1. Crea una copia de [esta planilla de calculo](https://docs.google.com/spreadsheets/d/114Jx1sSugz0_Z4Vk65O0UDa1Drmn3d7IVeqG5yJ6JH8/edit?usp=sharing).
2. Una vez copiada, toca en `Archivo > Publicar en la web`, selecciona `Valores separados por comas (.csv)` del desplegable y clickea en `publicar`.
3. Asegurate que en vez de `Pagina web` diga `Valores separados por comas (.csv)` y copia el enlace.
4. Pega el enlace en [este archivo](./app/constants.ts) y completa los datos de tu tienda.
5. Publica el sitio en [algun hosting que soporte NextJS](https://vercel.com)

# TODO
* Revisar si deberia traer los fields como un Record<string, string> o como un array.
* Revisar si CartDrawer deberia ser un solo componente o dividirlo mas
* Si no tengo fields, el componente de Details debería mostrarme el botón de completar pedido
* Datos de tienda vía hoja de sheet
* Búsqueda
* Secciones por categoría

* Verificar cuando se agrega un producto con 'options' al carrito.
