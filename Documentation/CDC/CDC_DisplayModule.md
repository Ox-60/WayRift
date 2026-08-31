# CDC — DisplayModule

## Responsabilités

- Nametags invisibles par défaut (ProAntiTab)
- Nametags visibles si présentation mutuelle (CustomNameplates + LuckPerms)
- Nametags visibles si joueur à **3 blocs ou moins** autour de soi (distance de proximité)
- **Citrouille sur la tête** : masque le pseudo — le joueur est anonyme tant qu'il la porte
- **Dans l'ombre / derrière un mur** : non viable techniquement — abandonné
- Tête de mort sur joueurs Infâmes (réputation < 100) via LuckPerms rank `infame`
- **Couronne** sur joueurs Légendaires (réputation ≥ 1000) via LuckPerms rank `legendaire` + CustomNameplates → symbole inversé de la tête de mort Infâme, signale les chasseurs éligibles à la Traque
- Prénoms RP accessibles dans le Tab (complétion automatique)
- Affichages RP automatiques avec portée configurable

---

## Affichages RP automatiques

| Événement | Message affiché | Portée |
|---|---|---|
| Joueur tombe en Down | [Nom] est tombé(e)... | 30 blocs |
| Joueur fouillé | [A] fouille [B] | 20 blocs |
| Joueur revivé | [Nom] a été relevé(e) par [Joueur] | 30 blocs |
| Joueur inspecté | [A] observe attentivement [B] | 10 blocs |
| Guerre déclarée | La guerre entre [A] et [B] est déclarée | Serveur entier |
| Nation fondée | La nation [X] a été fondée | Serveur entier |
| Nouveau personnage | Un voyageur sans passé arrive... | Serveur entier |

---

## Configuration

| Variable | Défaut | Type | Description |
|---|---|---|---|
| `display.down-range` | 30 | Int | Portée affichage Down (blocs) |
| `display.fouille-range` | 20 | Int | Portée affichage fouille (blocs) |
| `display.revive-range` | 30 | Int | Portée affichage revive (blocs) |
| `display.inspect-range` | 10 | Int | Portée affichage inspection (blocs) |
| `display.war-range` | -1 | Int | Portée guerre (-1 = serveur entier) |
| `display.infame-rank-name` | infame | String | Nom du rank LuckPerms pour les Infâmes |
| `display.legendaire-rank-name` | legendaire | String | Nom du rank LuckPerms pour les Légendaires |
| `display.legendaire-icon` | couronne | String | Icône affichée sur les Légendaires (couronne) |
| `display.nametag-proximity-blocks` | 3 | Int | Distance en blocs pour affichage automatique du nameplate |
| `display.pumpkin-hides-nametag` | true | Boolean | Citrouille sur la tête = pseudo masqué |

---

*WayRift — V3 — Confidentiel*
