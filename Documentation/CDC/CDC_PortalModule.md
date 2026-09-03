# CDC — PortalModule

## Responsabilités

- Gérer les 4 types de portails : Instable, Stable, Temporel, Faille
- 4 états joueur par monde : Habitant, Visiteur, Exilé, Banni
- Vérifications avant TP : banni, fermé, archivé
- Arrivée à 3 blocs aléatoires si joueur en Down/Coma


---

## Les 4 types de portails

| Type | Comportement | Usage | Lore |
|---|---|---|---|
| **Instable** | Se referme après le passage d'un joueur | Usage unique — disparaît après traversée | Portails brisés du multivers |
| **Stable** | Reste ouvert tant qu'il est activé | Navigation standard entre mondes (Multiverse-Core Nether Portals) | Portails réparés par les nations |
| **Temporel** | Accès permanent, sens unique (passé) | Monde minier uniquement | Le monde joueur est vide car son passé a été pillé |
| **Faille** | Créé par un joueur, durée limitée | Accès à un donjon (V5+) | Anomalie temporelle créée par la maîtrise du multivers |

---

## Portails en V1 sur la map

| Portail | Type | Statut | Destination |
|---|---|---|---|
| Portail monde minier | Temporel | Actif dès le début | Passé du monde joueur |
| Portail lore (x1-2) | Instable | Actif — se referme après passage | Map secrète (retour auto 5s) |
| Monolithe | Stable | Inactif → actif fin V1 par event GM | Capitale |

---

## Vérifications avant TP

```
Monde banni      -> REFUSÉ
Monde fermé      -> REFUSÉ
Monde archivé    -> REFUSÉ
Joueur Down/Coma -> AUTORISÉ, arrivée 3 blocs aléatoires autour du portail dest
```

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/wtp <monde>` | TP direct vers le spawn d'un monde | GM/staff |
| `/capital` | TP direct vers la Capitale | GM/staff |

| `/portal link <a> <b>` | Crée le lien entre deux portails stables | admin |
| `/portal ban <uuid> <monde>` | Bannit un joueur d'un monde | admin |
| `/portal faille create <joueur>` | Crée une faille pour un joueur sans item (GM event) | GM |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `portal.coma-arrival-radius` | 3 | Int | Rayon blocs arrivée si Down/Coma |
| `portal.adventure-mode-visitors` | true | Boolean | Mode Aventure pour les non-habitants |
| `portal.faille-duration-minutes` | 15 | Int | Durée d'une faille (portail ouvert pendant 15 min) |
| `portal.faille-no-exit` | true | Boolean | Impossible de sortir sauf via le portail de sortie initial |
| `portal.faille-craftable` | true | Boolean | Item Faille craftable par les joueurs (V5+) |

---

## Failles — Détail (V5+)

### Fonctionnement

```
1. Le joueur craft l'item Faille (recette à définir)
2. Il pose l'item au sol à l'endroit voulu
3. Un portail s'ouvre et reste actif 15 minutes
   -> Tout joueur peut entrer pendant ces 15 minutes
4. Une fois à l'intérieur :
   -> Impossible de sortir sauf en retournant au portail d'entrée
   -> Le portail de sortie est au début du donjon
5. Si le portail se ferme (15 min écoulées) pendant qu'un joueur est dedans :
   -> Le joueur reste coincé jusqu'à la fin du donjon
   -> Ou retour forcé au spawn après X temps (à définir)
6. Item Faille = consommable (détruit à la pose)
```

### Préparation avant l'entrée

Aucun équipement n'est fourni par le donjon — les joueurs doivent se préparer avec **leur propre stuff** (armes, armure, potions) avant d'entrer.

### Gestion de la mort en instance

**Règle spécifique au donjon, distincte du système de mort standard du serveur RP :**

```
Si un joueur meurt à l'intérieur d'une instance de donjon :
  -> Il est simplement ÉJECTÉ de l'instance
  -> PAS de Down, PAS de Coma, PAS de wipe
  -> Retour au point d'entrée du portail (extérieur)
```

> Le donjon est un espace de jeu à part, avec ses propres enjeux (perdre son run, potentiellement de l'équipement selon les règles internes du donjon à définir), sans mélanger ça avec les conséquences RP lourdes du serveur principal (coma, wipe). Justification narrative à rédiger — pourquoi une mort en Faille "éjecte" plutôt que de déclencher le cycle de mort classique.

### Contenu des donjons (à définir en V5)
- Mobs custom, puzzles, salles à explorer
- Récompenses à la fin (items rares, réputation, tokens)
- Difficulté variable selon le type de Faille

---

*WayRift — V3 — Confidentiel*
