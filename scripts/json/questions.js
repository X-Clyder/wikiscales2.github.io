questions = { // don't change this line
        "test1": {
            "question_en": "First",
            "answers": [
                "yes",
                "no",
                "idk",
                "apathy"
            ],
            "results": {},
            "nextquestion": {
                "yes": "test2",
                "no": "test2",
                "idk": "test2",
                "apathy": "test2"
            }
        },
        "test2": {
            "question_en": "456456456?",
            "answers": [
                "yes",
                "no"
            ],
            "results": {
                "yes": "autocracy",
            },
            "nextquestion": {
                "no": "test3",
            }
        },
        "test3": {
            "question_en": "TESTTEST1112121BLABLAL--BL212121121212TESTTEST1112121BLABLAL--BL212121121212?",
            "answers": [
                "yes",
                "no"
            ],
            "results": {
                "yes": "democracy1",
                "no": "democracy2",
            },
            "nextquestion": {
            }
        }
    }
