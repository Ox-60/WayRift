# CDC — PortalModule

## Responsabilités

- Gérer les 4 types de portails : Instable, Stable, Temporel, Faille
- 4 états joueur par monde : Habitant, Visiteur, Exilé, Banni
- Vérifications avant TP : banni, fermé, archivé
- Arrivée à 3 blocs aléatoires si joueur en Down/Coma
- Délai d'exil : 1 mois avant re-habitation

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
| `/habite <monde>` | Définit le monde attitré d'un joueur | joueur |
| `/portal link <a> <b>` | Crée le lien entre deux portails stables | admin |
| `/portal ban <uuid> <monde>` | Bannit un joueur d'un monde | admin |
| `/portal faille create <joueur>` | Crée une faille temporaire pour un joueur (V5+) | GM |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `portal.exile-rehab-days` | 30 | Int | Jours avant re-habitation après exil |
| `portal.coma-arrival-radius` | 3 | Int | Rayon blocs arrivée si Down/Coma |
| `portal.adventure-mode-visitors` | true | Boolean | Mode Aventure pour les non-habitants |
| `portal.faille-duration-minutes` | 5 | Int | Durée d'une faille créée par un joueur (V5+) |

---

*WayRift — V3 — Confidentiel*
