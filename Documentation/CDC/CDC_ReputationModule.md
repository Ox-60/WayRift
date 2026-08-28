# CDC — ReputationModule

## Principes fondamentaux

- La réputation bouge **lentement** — conçue pour évoluer sur des semaines, pas des jours
- Elle représente l'image publique d'un joueur sur le serveur
- Les deux extrêmes (Légendaire et Infâme) sont des **choix de gameplay conscients** qui prennent du temps
- Atteindre le rang Infâme ne doit pas être lié uniquement au PvP — plusieurs chemins possibles

---

## Seuils et paliers

| Score | Label | Nameplate | Accès | Restriction |
|---|---|---|---|---|
| 80-100 | Légendaire | Or | Zones VIP Capitale | — |
| 60-79 | Honorable | Vert clair | — | — |
| 40-59 | Neutre | Gris | — | — |
| 20-39 | Neutre bas | Gris foncé | — | — |
| 10-19 | Suspect | Orange | — | Interdit HDV officiel |
| 0-9 | **Infâme** | Rouge + tête de mort | Bas-Fonds (V3) | Interdit HDV officiel |

> La tête de mort est affichée via CustomNameplates + LuckPerms rank `infame`.

---

## Limite hebdomadaire — Règle centrale

**±15 points maximum par semaine (cumulés)**

Le compteur cumulé fonctionne ainsi :
- Chaque point gagné OU perdu dans la semaine compte dans le total
- Exemple : +1 puis -1 = 2 points utilisés sur 15
- Une fois les 15 points atteints, plus aucune variation jusqu'à la semaine suivante
- Cette limite s'applique à TOUTES les sources sauf les malus de modération (warn/mute/ban)

**Limites supplémentaires par source :**
- Malus PvP (Downs) : -5 pts/semaine maximum
- Inactivité : -5 pts/semaine maximum (retour vers neutre)

---

## Actions et effets

### Actions positives

| Action | Effet | Condition |
|---|---|---|
| Recevoir un vote positif | +1 point | Via paiement impôts d'un autre joueur. Max 2 votes consécutifs par même votant. |
| Payer ses impôts à temps | +1 point | Par paiement effectué dans les délais |
| Aider un joueur en Down (revive) | +1 point | Sans être médecin — action altruiste |
| Faire un don public à la Capitale | +2 points | Max 1 fois par semaine — montant minimum à définir |
| Voter pour le serveur (top-serveurs) | +1 vote temporaire à distribuer | Dure 1h — à attribuer à une faction ou un joueur |
| Event bienveillant GM | +1 à +5 votes positifs directs aux participants | GM configure la valeur (1 à 5) |
| Participation event GM (choix joueur) | 1 à 5 votes à distribuer soi-même | GM attribue les votes, joueur choisit + ou - |
| Victoire de guerre | +5 pts permanents + 5 pts temporaires | Tend vers l'extrémité actuelle du joueur |

> La victoire de guerre tend vers l'extrémité actuelle : un Infâme qui gagne descend encore plus (−5/−5), un Légendaire qui gagne monte encore plus (+5/+5).

### Actions négatives

| Action | Effet | Condition |
|---|---|---|
| Recevoir un vote négatif | -1 point | Via paiement impôts. Max 2 votes consécutifs par même votant. |
| Mettre un joueur en Down | -1 point | Hors guerre déclarée. Max -5 pts/semaine via cette source. |
| Event malveillant GM | -1 à -3 votes négatifs directs | Accessible uniquement aux joueurs Infâmes et mafias |
| Défaite de guerre | -5 points | Tend vers l'extrémité actuelle du joueur |
| Warn de modération | -5 points (1 semaine) | Tend vers le neutre — hors limite hebdomadaire |
| Mute de modération | -10 points (1 mois) | Tend vers le neutre — hors limite hebdomadaire |
| Ban temporaire | -20 points (3 mois) | Tend vers le neutre — hors limite hebdomadaire |

### Actions sans effet sur la réputation

| Action | Raison |
|---|---|
| Wipe d'un joueur | Neutre — pas de gain ni de perte |

---

## Comportement passif — Inactivité

Un joueur inactif voit sa réputation revenir **progressivement vers le Neutre (40)** :
- Si réputation > 40 : descend de 5 points/semaine max vers 40
- Si réputation < 40 : monte de 5 points/semaine max vers 40
- S'arrête exactement à 40

> L'inactivité neutralise les extrêmes mais ne punit pas — elle ramène vers la moyenne.

---

## Comportement de la réputation selon le camp

**Victoire/défaite de guerre — tend vers l'extrémité actuelle**

| Camp | Réputation actuelle | Résultat victoire | Résultat défaite |
|---|---|---|---|
| Héros (> 40) | Légendaire en cours | +5 permanent +5 temp | -5 permanent |
| Neutre (~40) | Neutre | +5 permanent +5 temp | -5 permanent |
| Mafia (< 40) | Infâme en cours | -5 permanent -5 temp | +5 permanent |

> Les mafias qui gagnent descendent encore plus bas. Les héros qui gagnent montent encore plus haut. La guerre renforce l'identité du camp.

**Modération — tend vers le neutre**

Les warn/mute/ban poussent toujours vers 40, quel que soit le camp. Un Légendaire modéré redescend vers le neutre. Un Infâme modéré remonte vers le neutre. C'est une sanction qui neutralise les extrêmes.

---

## Votes de réputation — Détail

- Un même joueur peut voter pour/contre la même personne **maximum 2 fois de suite**
- Après 2 votes consécutifs, il doit voter pour quelqu'un d'autre avant de pouvoir revoter
- Le vote via impôts : payer ses impôts de faction génère un vote à distribuer
- Le vote via top-serveur : dure 1h — le vote expire s'il n'est pas utilisé

---

## Simulation — Temps pour atteindre les extrêmes

**Joueur voulant atteindre Légendaire (0 → 80) :**
```
Semaine type active :
  +2 dons publics (1 fois/semaine) = +2
  +3 votes positifs reçus           = +3
  +1 impôts payés                   = +1
  +1 revive d'un Down               = +1
  Total = +7 pts/semaine (sous la limite de 15)

80 points / 7 pts/semaine = ~11 semaines (~3 mois)
```

**Joueur voulant atteindre Infâme (40 → 9) :**
```
Semaine type mafia :
  -2 votes négatifs reçus           = -2
  -5 Downs infligés (limite atteinte) = -5
  -2 votes négatifs distribués       = -2
  Total = -9 pts/semaine

31 points / 9 pts/semaine = ~3.5 semaines (~1 mois)
```

> Descendre vers Infâme prend environ 1 mois d'activité mafia soutenue. Monter vers Légendaire prend environ 3 mois d'activité bienveillante. La progression est asymétrique volontairement — être Légendaire est un titre qui se mérite sur la durée.

---

## Intégration technique

- **ReputationPlugin** + **LuckPerms** + **CustomNameplates**
- Seuils → rangs LuckPerms automatiques → CustomNameplates adapte le nameplate
- Logs de toutes les variations avec source, valeur et date

---

## Commandes

| Commande | Description | Permission |
|---|---|---|
| `/reputation info [joueur]` | Affiche réputation, label, historique récent | joueur |
| `/reputation top` | Classement des joueurs | joueur |
| `/reputation vote <joueur> up/down` | Utilise un vote disponible | joueur (si votes disponibles) |
| `/reputation set <uuid> <valeur>` | Définit la réputation directement | admin |
| `/reputation add <uuid> <valeur> <raison>` | Ajoute/retire des points avec log | admin/GM |
| `/reputation history <uuid>` | Historique complet des variations | admin/GM |
| `/reputation reload` | Recharge la configuration | admin |

---

## Configuration

| Variable | Valeur | Type | Description |
|---|---|---|---|
| `reputation.infame-threshold` | 10 | Int | Seuil Infâme (< 10) |
| `reputation.hdv-threshold` | 20 | Int | Seuil interdiction HDV (< 20) |
| `reputation.legendary-threshold` | 80 | Int | Seuil Légendaire (>= 80) |
| `reputation.neutral-value` | 40 | Int | Valeur neutre (centre) |
| `reputation.weekly-change-limit` | 15 | Int | Points max modifiés par semaine (cumulé) |
| `reputation.weekly-pvp-malus-limit` | 5 | Int | Malus max/semaine via Downs |
| `reputation.weekly-inactivity-limit` | 5 | Int | Points max/semaine via inactivité |
| `reputation.infame-rank` | infame | String | Rang LuckPerms Infâme |
| `reputation.legendary-rank` | legendaire | String | Rang LuckPerms Légendaire |
| `reputation.suspect-rank` | suspect | String | Rang LuckPerms Suspect |
| `reputation.down-penalty` | 1 | Int | Malus par Down infligé hors guerre |
| `reputation.revive-bonus` | 1 | Int | Bonus par revive effectué |
| `reputation.donation-bonus` | 2 | Int | Bonus don public Capitale (1x/semaine) |
| `reputation.tax-payment-bonus` | 1 | Int | Bonus paiement impôts |
| `reputation.war-victory-permanent` | 5 | Int | Bonus permanent victoire guerre |
| `reputation.war-victory-temporary` | 5 | Int | Bonus temporaire victoire guerre |
| `reputation.war-defeat-malus` | 5 | Int | Malus défaite guerre |
| `reputation.warn-malus` | 5 | Int | Malus warn (1 semaine) |
| `reputation.mute-malus` | 10 | Int | Malus mute (1 mois) |
| `reputation.ban-malus` | 20 | Int | Malus ban temporaire (3 mois) |
| `reputation.vote-max-consecutive` | 2 | Int | Votes consécutifs max par même votant |
| `reputation.server-vote-duration-minutes` | 60 | Int | Durée du vote top-serveur avant expiration |

---

## Points ouverts

| # | Point | Priorité |
|---|---|---|
| 1 | Montant minimum du don public à la Capitale | À définir |
| 2 | Durée exacte de l'inactivité avant que le retour vers neutre commence | À définir |
| 3 | Les votes temporaires (top-serveur) comptent-ils dans la limite des 15 pts/semaine ? | À clarifier |

---

*WayRift — V3 — Confidentiel*
