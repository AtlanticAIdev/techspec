const AIRBUS_FR_TEMPLATE = `# DOMAINE D'APPLICATION : Manufacturing
## Spécification Technique Détaillée de : [Titre de la Spécification]

| Rôle | Date | Nom | Fonction |
|---|---|---|---|
| Approbateur | [Date Approbateur] | [Nom Approbateur] | [Fonction Approbateur] |
| Auteur | [Date Auteur] | [Nom Auteur] | [Fonction Auteur] |

---

# 1. INTRODUCTION
## 1.1. Objet
[Objet description]

## 1.2. Domaine d’application
* **Organisation / Organizational Model**: [x] Core Model / [ ] Autre
* **Divisions concernées**: Toutes / [Divisions]

## 1.3. Besoin et justification du specifique
[Besoin et justification]

## 1.4. Typologie de la solution
[ ] Transactionnel / [ ] Interface OUT / [ ] Impression / [ ] Interface IN / [ ] Reporting / [ ] Reprise de données / [ ] Programme / [ ] Enhancement / [ ] Autre

## 1.5. Documents associés
| Type de document | Références |
|---|---|
| [Type Doc] | [Ref Doc] |

## 1.6. Terminologie
| Terme, abréviation | Désignation |
|---|---|
| [Terme] | [Designation] |

---

# 2. Description de la solution
## 2.1. Principe de fonctionnement
[Principe de fonctionnement]

## 2.2. Description détaillée
### 2.2.1. Détail du dialogue / Transaction / Formulaire / Interface
**Ecran xxx**
| Bloc | Repère | Description | Attributs/Fonctionnalités |
|---|---|---|---|
| [Bloc] | [Repere] | [Desc] | [Attributs/Aide à la saisie] |

**Paramètres E/S**
| Paramètre | E/S | Obligatoire ? | Description |
|---|---|---|---|
| [Param] | [E/S] | [Oui/Non] | [Desc] |

### 2.2.2. Detail du traitement
[Detail du traitement]

### 2.2.3. Règles de gestion
| Id | Nom | Description | Feature / US |
|---|---|---|---|
| RG01 | [Nom RG] | [Desc RG] | [US] |

## 2.3. Gestion des langues
* Langue utilisée: [x] Français / [ ] Anglais / [ ] Autre
| Champ | Langue | Désignation |
|---|---|---|
| [Champ] | [Langue] | [Designation] |

| N° message | Langue | Désignation |
|---|---|---|
| [Msg ID] | [Langue] | [Designation] |

## 2.4. Gestion des autorisations
[Roles & Autorisations requises]

## 2.5. Volumetrie
[Volumetrie attendue]

## 2.6. Cas de tests
| Cas | Description | Résultat attendu |
|---|---|---|
| Test 01 | [Test Desc] | [Expected] |

---

# 3. CONCEPTION technique DETAILLEE
## 3.1. Liste globale des objets techniques
| Type | Nom | Description |
|---|---|---|
| [Type Object] | [Nom Object] | [Description] |

## 3.2. Implémentation de l’objet technique [Nom Principal]
### 3.2.1. Objets DDIC associés
**Table [Nom Table]**
* Libellé: [Libelle Table]
* Classe de livraison: A
* Groupe d’autorisations: [Auth]
* Type de données: [Type]
* Volumétrie attendue: [Vol]
* Bufferisation: [Buff]

| Zone | Clé | E.Données | Domaine | Table de contrôle | Format | Long | Désignation |
|---|---|---|---|---|---|---|---|
| [Champ] | [Key?] | [DataElement] | [Domain] | [CheckTable] | [Format] | [Len] | [Desc] |

**Structure [Nom Structure]**
* Libellé: [Libelle Structure]

| Zone | E.Données | Domaine | Table de contrôle | Format | Long | Désignation |
|---|---|---|---|---|---|---|---|
| [Champ] | [DataElement] | [Domain] | [CheckTable] | [Format] | [Len] | [Desc] |

### 3.2.2. Dynamisation du traitement
[BAdI / Exit routing details]

### 3.2.3. Logique de traitement
* **Ecran de sélection / Dynpros**: [Selection details]
* **Algorithme traitement**:
  [Detailed pseudo-code or description]
* **Structure fichier interface (entrée/sortie)**:
  | Zone | E.Données | Type | Long. | Dec. | Description |
  |---|---|---|---|---|---|
  | [Zone] | [DataElement] | [Type] | [Len] | [Dec] | [Desc] |
* **Log/report**: [SLG1, ALV, etc.]

---

# 4. Table des révisions
| Version | Indice | Date | Auteur | Correction / Évolution / Description |
|---|---|---|---|---|
| V1.0 | X | [Date] | [Nom] | Version initiale |
`;

const AIRBUS_EN_TEMPLATE = `# APPLICATION AREA: FI/CO
## Technical Detailed Specification for: [Specification Title]

| Role | Date | Name | Function |
|---|---|---|---|
| Approver | [Date] | [Name] | [Function] |
| Author | [Date] | [Name] | [Function] |

---

# 1. INTRODUCTION
## 1.1. Purpose
This document constitutes the detailed functional and technical specification of [Topic].

## 1.2. Application
* **Organization / Organizational Model**: [x] Core Model / [ ] Other: ___________________________
* **Regions**: [ ] FR [ ] CA [ ] US [ ] Other: ___________________________
* **Affected divisions**: All / [Divisions]

## 1.3. Need and justification of the specific
[Need and justification]

## 1.4. Type of solution
[ ] Transactionnel / [ ] Interface OUT / [ ] Impression / [ ] Interface IN / [ ] Reporting / [ ] Data recovery / [ ] Program / [ ] Enhancement / [ ] Other: ________________________

## 1.5. Related documents
| Document Type | References |
|---|---|
| [Doc Type] | [Doc Ref] |

## 1.6. Terminology
| Term, abbreviation | Designation |
|---|---|
| [Term] | [Designation] |

---

# 2. Solution Description
## 2.1. Working principle
[Functional principle / process flow]

## 2.2. Detailed Description
### 2.2.1. Dialog / Transaction / Form / Interface Detail
**Screen xxx**
| Block | Benchmark | Description | Attributes/Features |
|---|---|---|---|
| [Block] | [Benchmark] | [Desc] | [Attributes/Features / Input Assistance] |

**Buttons / Menus / Keys Mapping**
| Button / Menu | Action | Keyboard Shortcut |
|---|---|---|
| [Button] | [Action] | [Shortcut] |

**I/O settings**
| Parameter | I/O | Mandatory? | Data Reading/Logging |
|---|---|---|---|
| [Param] | [I/O] | [Yes/No] | [Reading/Logging] |

### 2.2.2. Treatment Detail
[Treatment / logic steps detail]

### 2.2.3. Management rules
| Id | Name | Description | Feature / US |
|---|---|---|---|
| BR01 | [Rule Name] | [Rule Desc] | [US] |

## 2.3. Language management
* Language used for this processing: [x] English / [ ] Portuguese / [ ] Other: ________________________
| Field | Language | Designation |
|---|---|---|
| [Field] | [Lang] | [Designation] |

| N° message | Language | Designation |
|---|---|---|
| [Msg ID] | [Lang] | [Designation] |

## 2.4. Permissions Management
[Required Roles & Authorizations]

## 2.5. Volumes
[Expected volumes / performance data]

## 2.6. Test cases
| Case | Description | Expected result |
|---|---|---|
| Test 01 | [Test Desc] | [Expected] |

---

# 3. CONCEPTION technique DETAILLEE
## 3.1. Global list of technical objects
| Type | Name | Description |
|---|---|---|
| [Object Type] | [Object Name] | [Description] |

## 3.2. Implementation of the technical object [Main Object Name]
### 3.2.1. Related DDIC objects
**Table [Table Name]**
* Wording: [Table Wording]
* Delivery class: A
* Permission Group: [Auth]
* Data Type: [Type]
* Expected volume: [Vol]
* Bufferisation: [Buff]
* Function group: [FG]
* Management transaction: [TCode]

| Area | Key | E. Data | Domain | Control Table | Format | Long | Designation |
|---|---|---|---|---|---|---|---|
| [Field] | [Key?] | [DataElement] | [Domain] | [CheckTable] | [Format] | [Len] | [Desc] |

**Structure [Structure Name]**
* Wording: [Structure Wording]

| Area | E. Data | Domain | Control Table | Format | Long | Designation |
|---|---|---|---|---|---|---|---|
| [Field] | [DataElement] | [Domain] | [CheckTable] | [Format] | [Len] | [Desc] |

**Other objects** (authorization, search aid, blocking object, etc.):
[Other objects detail]

### 3.2.2. Boosting treatment
[Boosting treatment details / Exit/BAdI dynamization table and MF or class handler]

### 3.2.3. Processing logic (program, screen, function...)
* **Selection Screen / Dynpros**: [Selection details]
* **Treatment algorithm**:
  [Detailed algorithm or pseudo-code]
* **File structure interface (input/output)**:
  Detail here the format of the I/O files (flat/hierarchical file, separator, encoding, headers, etc.). Also detail the structure of the file if it is not based on a DDIC structure.
  | Area | E. Data | Type | Long. | Dec. | Description |
  |---|---|---|---|---|---|
  | [Field] | [DataElement] | [Type] | [Len] | [Dec] | [Desc] |
* **Log/report** (SLG1, ALV ….):
  [Log details]

---

# 4. Table of Revisions
| Version | Index | Date | Creation / Evolution / Correction | Description and Rationale for Revisions |
|---|---|---|---|---|
| V1.0 | X | [Date] | Initial Release | Version initiale |
`;

module.exports = {
    AIRBUS_FR_TEMPLATE,
    AIRBUS_EN_TEMPLATE
};
