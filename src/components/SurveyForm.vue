<template>
  <div>
    <h1>Engagis Support Survey Form</h1>
    <Survey :survey="survey" />
  </div>
</template>
  
<script>
import * as SurveyVue from 'survey-vue/survey.vue.js';
import 'survey-vue/survey.css';
import { Model } from 'survey-vue';
import axios from 'axios';

export default {
  data() {
    const surveyJson = {
      questions: [
        {
          type: 'rating',
          name: 'satisfactionRating',
          title: 'How satisfied are you with the overall support provided by Engagis? ',
          rateType: "stars",
          rateCount: "5",
          rateMax: "5",
        },
        {
          type: 'rating',
          name: 'responseTimely',
          title: 'Did the Engagis support team respond to your queries in a timely manner?',
          rateType: "smileys",
          scaleColorMode: "colored",
          rateCount: 2,
          rateMax: 2,
          displayMode: "buttons"
        },
        {
          type: 'radiogroup',
          name: 'supportExperience',
          title: 'How knowledgeable and helpful was the Engagis support team in addressing your concerns?',
          choices: [
            'Very knowledgeable and helpful',
            'Knowledgeable and helpful',
            'Neutral',
            'Not very knowledgeable and helpful',
            'Not knowledgeable and helpful'
          ]
        },
        {
          type: 'radiogroup',
          name: 'supportType',
          visibleIf: "{supportExperience} notempty",
          title: 'Who assisted you?',
          choices: [
            'Remote Engagis Support',
            'On-site Technician'
          ]
        },
        {
          type: 'rating',
          name: 'resolutionTimely',
          title: 'Were you able to easily reach a resolution to your issue with the help of Engagis support?',
          rateType: "smileys",
          scaleColorMode: "colored",
          rateCount: 3,
          rateMax: 3,
          displayMode: "buttons"
        },
        {
          type: 'comment',
          name: 'overallExperience',
          title: 'Is there anything specific that Engagis support could have done better to improve your experience',
          inputType: 'text',
          placeHolder: '  ',
          rows: 4
        }
      ]
    };

    const survey = new Model(surveyJson);
    survey.focusFirstQuestionAutomatic = false;

    survey.onComplete.add(this.alertResults);

    return {
      survey,
    };
  },
  methods: {
    alertResults(surveyResult) {
      const answers = surveyResult.data;
      const urlPath = window.location.pathname;
      const caseValue = urlPath.substring(urlPath.lastIndexOf('/') + 1);
      answers.case = caseValue;
      //   console.log('Survey Answers:', answers);
      const payload = {
        details: answers,
      };

  axios
//   .post('http://integratoradmin.engagisstaging.com/api/engagis-survey', payload)
           .post('http://202.137.117.195:8000/api/engagis-survey', payload)
 ///   .post('http://127.0.0.1:8000/api/engagis-survey', payload)
        .then(() => {
          console.log(answers);
          console.log('Survey submitted successfully');
          
        })
        .catch((error) => {
          console.error('Failed to submit survey:', error);
         
        });
    },

  },
  components: {
    Survey: SurveyVue.Survey,
  },
};
</script>
  