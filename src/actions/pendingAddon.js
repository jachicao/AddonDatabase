//@flow
import {
  PENDING_ADDON_SUBMIT,
  PENDING_ADDON_LIST,
  PENDING_ADDON_DELETE,
  PENDING_ADDON_ACCEPT,
  PENDING_ADDON_EDIT
} from '../constants/pendingAddon';
var request = require('superagent');

export const requestSubmit = (recaptcha, hwid, authorName, name, forumUrl, githubUrl, category, championId, utilityType, libraryType) => {
  return {
    type: PENDING_ADDON_SUBMIT,
    payload: new Promise((resolve, reject) => {
      request('POST', '/api/pendingAddon/')
      .set('Accept', 'application/json')
      .send({
        recaptcha: recaptcha,
        hwid: hwid,
        authorName: authorName,
        name: name,
        forumUrl: forumUrl,
        githubUrl: githubUrl,
        category: category,
        championId: championId,
        utilityType: utilityType,
        libraryType: libraryType
      })
      .then(resolve, reject);
    })
  };
}

export const requestList = (token: string) => {
  return {
    type: PENDING_ADDON_LIST,
    payload: new Promise((resolve, reject) => {
      request('GET', '/api/pendingAddon/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .then(resolve, reject);
    })
  };
}

export const requestDelete = (token: string, id: string) => {
  return {
    type: PENDING_ADDON_DELETE,
    payload: new Promise((resolve, reject) => {
      request('DELETE', '/api/pendingAddon/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .then(resolve, reject);
    })
  };
}

export const requestAccept = (token: string, id: string) => {
  return {
    type: PENDING_ADDON_ACCEPT,
    payload: new Promise((resolve, reject) => {
      request('PUT', '/api/pendingAddon/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .then(resolve, reject);
    })
  };
}


export const requestEdit = (token, id, authorName, name, forumUrl, githubUrl, category, championId, utilityType, libraryType) => {
  return {
    type: PENDING_ADDON_EDIT,
    payload: new Promise((resolve, reject) => {
      request('PATCH', '/api/pendingAddon/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        authorName: authorName,
        name: name,
        forumUrl: forumUrl,
        githubUrl: githubUrl,
        category: category,
        championId: championId,
        utilityType: utilityType,
        libraryType: libraryType
      })
      .then(resolve, reject);
    })
  };
}
