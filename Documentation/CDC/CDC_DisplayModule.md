# CDC — DisplayModule

## Responsabilités

- Nametags invisibles par défaut (ProAntiTab)
- Nametags visibles si présentation mutuelle (CustomNameplates + LuckPerms)
- Tête de mort sur joueurs Infâmes (réputation < 10) via LuckPerms rank `infame`
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

---

*WayRift — V3 — Confidentiel*
