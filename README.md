# Next-Door!

# App Link 
 https://nextdoor-app.herokuapp.com/

# Descripción

NextDoor es una aplicación de comercio de proximidad que permite acercar a los vendedores de barrio a sus clientes de una manera tecnológcica y por tanto más sencilla.
Accediendo como vendedor podrás poner la venta cada uno de tus productos, por otra parte desde tu perfil de vendedor tus clientes podrán contactar contigo a través de un chat interactivo.
Si accedes como usuario podrás difrutar de una amplia gama de productos disponibles, podrás filtar estos por el tipo de vendedor (Carnicería,Pescadería,Frutería...), por precio y lo más importante por la cercanía a tu direccion, pudiendo cumplir así el objetivo de esta aplicación que es la de apoyar al comercio de cercanía.

Accede a la ruta de server del proyecto y escribe los siguientes comandos.

# Server Install
```
npm install
```

# Server Usage
```
npm run dev
```

Accede a la ruta de client del proyecto y escribe los siguientes comandos.

# Cient Install
```
npm install
```

# Client Usage
```
npm run start
```

### Endpoints


 Backend Endpoints
 
|	Method	|	Path	|	Description	|
|	-	|	-	|	-	|	
|	POST	|	/api/auth/signUp	|	Create and save the user in the database	|
|	POST	|	/api/auth/signUpSeller	|	Create and save a seller in the database	|
|	POST	|	/api/auth/login	|	Login a user or a seller in the app |
|	GET	|	/api/auth/isloggedin	|	Check with the session if the user is allready logged |
|	GET	|	/api/auth/logout	|	Destroys the session of the user/seller |
|		|		|	|
|	GET	|	/api/allProducts	|	Takes all the products from the DB	|
|	GET	|	/api/allProducts/details/:id	|	Takes the detais of a product from the DB	|
|	GET	|	/api/allProducts/cart/add	|	Adds a product to the user cart	|
|	GET	|	/api/allProducts/cart/all	|	Takes all the products in the car of a user	|
|	PUT	|	/api/allProducts/cart/remove/:id	|	Removes a product from the user's cart	|
|	PUT	|	/api/allProducts/cart/removeAll	|	Removes all the products from the user's cart	|
|		|		|	|
|	GET	|	/api/reviews/	|	Takes all the reviews from an specific product |
|	POST	|	/api/reviews/create-new-review	|	Creates a review for an specific product |
|	DELETE	|	/api/reviews/remove/:id	|	Deletes an specific review |
|	GET	|	/api/reviews/user/:id	|	Takes the reviews of a user |
|	POST	|	/api/reviews/create-new-comment	|	Creates a comment of a review |
|		|		|	|
|	POST	|	/api/seller/create-new-product	|	Creates a new product in the DB |
|	GET	|	/api/seller/deleteProduct/:id	|	Removes a product from the DB |
|	PUT	|	/api/seller/deleteProductFromSeller/:id	|	Removes a product from the seller products list |
|	POST	|	/api/seller/edit	|	Edits the seller profile in the DB |
|	GET	|	/api/seller/:id |	Takes all the info from a seller profile |
|		|		|	|
|	POST	|	/api/user/edit |	Edits the user profile in the DB |
|	GET	|	/api/user/user/:id |	Takes the info of a user from the DB |
|		|		|	|
|	POST	|	/api/payment/checkout |	Makes the payment of a cart|
|		|		|	|
|	POST	|	/api/message/new-message |	Creates a message of the chat for an specific conversation |
|	GET	|	/api/message/:id |	Load all the messages of a conversation |
|		|		|	|
|	POST	|	/api/conversation/ |	Creates a new conversation between a user and a seller |
|	GET	|	/api/conversation/:id |	Load all the conversation from the DB of an specific user/seller |
|	GET	|	/api/conversation/findConversation/:id |	Load the info of an specific conversation |
|	GET	|	/api/api/upload/image |	Loads an image into Cloudinary service |

Front Endpoints 

|	Path	|	Description	|
|	-	|	-	|	
|	/	|	Landing page	|
|	/products	|	All products in the market	|
|	/chat	|	Renders the main chat page	|
|	/chat/:id	|	Renders an specific chat of a conversation	|
|	/paymet	|	Renders the payment gateaway	|
|	/products/cart	|	Renders the cart of a user	|
|	/products/:id	|	Renders the details of a product	|
|	/seller/:id	|	Renders the seller profile	|
|	/user/:id	|	Renders the user profile	|
|	/signUp	|	Renders the singUp page	|
|	/login	|	Renders the login page	|
|	/logout	|	Kills the session and redirects to the login page |
