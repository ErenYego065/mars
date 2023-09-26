NEW_ACCOUNT_SEED = [{
  "seed_config": {
   "is_screen": false,
   "is_odd": false,
   "is_doc_upload": false
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "yasumi@test.com",
   "title": "MR",
   "first_name": "Yasumi",
   "last_name": "Okazawa",
   "dob": "1947-03-20",
   "gender": "MALE",
   "nationality": "JPN",
   "birth_country": "JPN",
   "addresses": [{
    "line": "5-chome, Osa, Minami Ward",
    "city": "Fukuoka",
    "state_or_province": "Fukuoka",
    "postal_code": "811-1313",
    "country": "JPN",
    "from_date": "2007-01-01"
   }]
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_confirm": false,
   "is_odd": false,
   "is_doc_upload": false
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "rosalind@test.com",
   "first_name": "Rosalind",
   "last_name": "Altmann",
   "title": "MS",
   "dob": "1956-04-08",
   "birth_country": "GBR",
   "nationality": "GBR",
   "gender": "FEMALE"
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_confirm": false,
   "is_odd": false,
   "is_doc_upload": false
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "johnny@test.com",
   "first_name": "Johnny",
   "last_name": "Smith Hanso",
   "title": "MR",
   "dob": "1935-05-14",
   "birth_country": "GHA",
   "nationality": "GHA",
   "gender": "MALE"
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_confirm": false,
   "is_odd": true,
   "is_doc_upload": false,
   "odd_body": {
    "frequency": "WEEKLY",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES", "ADVERSE_MEDIA"],
    "enabled": true
   }
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "hristo@test.com",
   "first_name": "Hristo",
   "middle_name": "Todorov",
   "last_name": "Yordanov",
   "title": "MR",
   "dob": "1975-09-15",
   "birth_country": "BGR",
   "nationality": "BGR",
   "gender": "MALE"
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_confirm": false,
   "is_odd": true,
   "is_doc_upload": false,
   "odd_body": {
    "frequency": "MONTHLY",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES", "ADVERSE_MEDIA"],
    "enabled": true
   }
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "yazmina@test.com",
   "first_name": "Yazmina",
   "last_name": "Serrano Plaza",
   "title": "MS",
   "dob": "1984-04-24",
   "birth_country": "ESP",
   "nationality": "ESP",
   "gender": "FEMALE"
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_confirm": false,
   "is_odd": true,
   "is_doc_upload": false,
   "odd_body": {
    "frequency": "MONTHLY",
    "scope": ["PEP", "WATCHLIST", "DISQUALIFIED_ENTITIES", "ADVERSE_MEDIA"],
    "enabled": false
   }
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "stela@test.com",
   "first_name": "Stela",
   "middle_name": "Liliana",
   "last_name": "Lazurca Chiaburu",
   "title": "MS",
   "dob": "1977-06-13",
   "birth_country": "ROU",
   "nationality": "ESP",
   "gender": "FEMALE"
  }
 },
 {
  "seed_config": {
   "is_screen": false,
   "is_odd": false,
   "is_doc_upload": false
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "kanjeng@test.com",
   "first_name": "Kanjeng Raden Ayu",
   "last_name": "Cipto Murti",
   "title": "MS",
   "nationality": "IDN",
   "gender": "FEMALE"
  }
 },
 {
  "seed_config": {
   "is_screen": true,
   "screen_scope": ["pep", "watchlist", "disqualified_entities", "adverse_media"],
   "is_odd": false
  },
  "payload": {
   "type": "COMPANY",
   "email": "asia.bank@test.com",
   "company_name": "Asia Bank",
   "mobile": "+44 2071123456",
   "telephone": "+44 2072123456",
   "joined_at": "2016-10-10",
   "addresses": [{
    "line": "Offices 7-15, 67-69, 4 ul Ilinka",
    "city": "Moscow",
    "state_or_province": "Moscow",
    "postal_code": "109012",
    "country": "RUS",
    "from_date": "2013-03-01"
   }],
   "incorporation_country": "RUS",
   "primary_contact_name": "Chemexim",
   "primary_contact_email": "Chemexim@test.com"
  }
 },
 {
  "seed_config": {
   "is_screen": false,
   "is_odd": false,
   "is_doc_upload": true,
   "doc_upload_body": {
    "type": "PASSPORT",
    "description": "Customer Passport",
    "front_side_base64": {
     "filename": "passport_china.jpg",
     "content_type": "jpg",
     "file_size": 98378,
     "content": SAMPLE_PASSPORT_IMAGE
    }
   },
   "is_doc_ver": true,
   "is_id_ver": false
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "jun@test.com",
   "first_name": "Jun",
   "last_name": "Xiong",
   "dob": "1979-07-10",
   "nationality": "CHN"
  }
 },
 {
  "seed_config": {
   "is_screen": false,
   "is_odd": false,
   "is_doc_upload": true,
   "is_doc_ver": false,
   "is_id_ver": true,
   "doc_upload_body": {
    "type": "NATIONAL_ID_CARD",
    "description": "Customer National ID",
    "front_side_base64": {
     "filename": "erika_mustermann_ID.jpg",
     "content_type": "jpg",
     "file_size": 267463,
     "content": SAMPLE_ID_IMAGE
    }
   }
  },
  "payload": {
   "type": "INDIVIDUAL",
   "email": "erika@test.com",
   "first_name": "Erika",
   "last_name": "Mustermann",
   "dob": "1964-08-12"
  }
 }
];