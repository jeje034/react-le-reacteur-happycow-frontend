# Fonctionnalités

Entièrement responsive.

Les restaurants affichés sont prévus pour être les 10 restaurants les plus proches du navigateur affichant la page Web. Mais les données proviennent d'un fichier JSON. Et ce fichier contient uniquement des restaurants à Paris ou proche de Paris. J'ai donc fait comme si le navigateur se situait à Paris, juste en face de la cathédrale Notre Dame de Paris.

10 établissements peuvent défiler grâce à des boutons de défilement, sauf en affichage mobile. Le déplacement se fait en faisant glisser le doigt.
Pour les affichages PC, le bouton pour défiler à droite se masque automatiquement lorsque l'on arrive au dernier établissement. De même, pour que le bouton de gauche s'affiche, il faut avoir fait au préalable cliquer sur le bouton de droite.
Le bouton de droite peut aussi être masqué dès le départ si tous les établissements tiennent sur la page.
C'est le cas des B&Bs.

La photo en haut de la page d'accueil change chaque jour de la semaine. Ca fait 7 photos différentes en tout.

Le détail d'un établissement, la couleur du bandeau du haut change en fonction du type d'établissement :

-   violet pour les restaurants végétariens.
-   vert pour les restaurants vegans.
-   rouge pour les restaurants veg-options.
-   turquoise pour les B&Bs.

Sur cette même page, la ligne violette en bas du header n'est pas affichée.

Icone et texte "CLOSED NOW" en rouge si fermé
Icone et texte "OPEN NOW" en vert si ouvert
Les heures d'ouvertures ont été récupérées en parsant la description.
En examinant les données, on peut conclure que les horaires d'ouverture se trouvent en fin de description. Il faut gérer ces différentes types de données :
// ... Open Mon-Wed 11:00-23:00, Thu-Sat 11:00-02:00, Sun 11:00-23:00. (classique)
// ... Open Mon-Fri 10:00-19:30, Sat 12:00-19:30. Closed Sun. (avec horaires de fermeture à ignorer)
// ... Open Mon-Sun 12:00-14:30, 19:00-22:30. (avec un moins une tranche horaire sans jour => récupérer le jour de la tranche horaire précédente)
// ... Open Tue-Thu 18:00-23:00, Fri 18:00-02:00, Sat 10:00-02:00, Sun 10:00-19:00. (avec horaire de fin le jour suivant (00:00, 01:00, 02:00, ...))
//Parfois toutes les exceptions sont cumulées !

Avoir si on fait
Lorsque le restaurant est ouvert, la ligne sous "OPEN NOW" affiche :

-   dans le cas où le restaurant ferme dans moins de 45 minutes : un texte en rouge indque qu'il va bientôt fermer. Ex: "Closes in 40 min".
-   autrement : un texte en vert du style "until 10:00pm"

Lorsque le restaurant est ouvert, la 2 ligne sous "OPEN NOW" affiche la plage horaire d'ouverture.

Le package react-leaflet est utilisé pour les cartes OpenStreetMap.
La largeur dépend de la taille de l'écran.

Dans la page de détail de l'établissement, un clic sur la position de l'établissement ouvre une nouvelle page Web avec Google Map centré sur cet établissement. Les marqueurs indiquant la position du restaurant sont personnalisés. Ils sont différents en fonction du type d'établissement. Par exemple, la marqueur pour les établissements vegan est vert, le marqueur pour les B&Bs est bleu, ...
En cliquant sur le marqueur, un lien s'affiche. Il permet d'ouvrir un nouvel onglet du navigateur avec une carte Google Map centrée sur l'établissement.

Les restaurants peu chers (Inexpensive) ont un dollar jaune, 2 dollar gris. Les établissement moyennement chers (Moderate) ont 2 dollars gris et un dollar jaune. Les établissements chers ont 3 dollars jaunes. Sauf que dans le fichier JSON, on trouve seulement 2 valeurs pour le champs price : "Inexpensive" ou null; C'est pour cela que null a été considéré comme "Moderate". C'est le cas de "Loulou Friendly Diner", le 8e restaurant affiché.
Il n'y a pas de dollar sur les B&Bs.

Le rectangle est plus grand lorsque facebook est null
Resto avec facebook + site web et dans les 10 de mon site : https://www.happycow.net/reviews/shakespeare-and-company-cafe-paris-80718
Resto sans facebook avec site web https://www.happycow.net/reviews/vegethalles-paris-13798
Etablissement (percing) avec facebook sans site (=> facebook est présenté çà droite du texte Website) : https://www.happycow.net/reviews/aenima-tattoo-paris-120030
Resto sans facebook sans site

En cliquant sur le bouton "View-all", on accède à une page de recherche des restaurants avec des critères. Pour les écrans de 992 pixels et plus, une carte est affichée.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
