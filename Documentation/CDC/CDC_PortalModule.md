# CDC — PortalModule

## Responsabilités

- Portails physiques via **Multiverse-Core Nether Portals** — zéro dev custom pour les portails stables
- 4 états joueur par monde : Habitant, Visiteur, Exilé, Banni
- Vérifications avant TP : banni, fermé, archivé
- Arrivée à 3 blocs aléatoires si joueur en Down/Coma
- Délai d'exil : 1 mois avant re-habitation

---

## Vérifications portail

```
Monde banni      -> REFUSÉ
Monde fermé      -> REFUSÉ
Monde archivé    -> REFUSÉ
Joueur Down/Coma -> AUTORISÉ, arrivée 3 blocs aléatoires
```

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/wtp <monde>` | TP direct vers le spawn d'un monde | GM/staff |
| `/capital` | TP direct vers la Capitale | GM/staff |
| `/habite <monde>` | Définit le monde attitré d'un joueur | joueur |
| `/portal link <a> <b>` | Crée le lien entre deux portails | admin |
| `/portal ban <uuid> <monde>` | Bannit un joueur d'un monde | admin |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `portal.exile-rehab-days` | 30 | Int | Jours avant re-habitation après exil |
| `portal.coma-arrival-radius` | 3 | Int | Rayon blocs arrivée si Down/Coma |
| `portal.adventure-mode-visitors` | true | Boolean | Mode Aventure pour les non-habitants |

---

*WayRift — V3 — Confidentiel*
