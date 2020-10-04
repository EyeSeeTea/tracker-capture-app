/* global angular, moment, dhis2 */

'use strict';

/* Services */

var externalLookupServices = angular.module('externalLookupServices', ['ngResource'])

.service('FNrLookupService', function($http, DHIS2URL, $translate, NotificationService) {
        return {
            lookupFnr: function(fNr) {
                var url = '../' + DHIS2URL + '/person/sok';
                var promise = $http({
                    method: 'POST',
                    url: url,
                    data: fNr,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    return response.data;
                },function(error){
                    var errorMsgHdr, errorMsgBody;
                    errorMsgHdr = $translate.instant('error');

                    errorMsgBody =  'Feil ved henting av data om person:' + fNr;

                    if(error.status = 404) {
                        errorMsgBody = 'Tjeneste for henting av data om person er ikke tilgjengelig. '
                            + 'Prøv igjen senere eller fyll inn persondata manuelt.';
                    }
                    
                    NotificationService.showNotifcationDialog(errorMsgHdr, errorMsgBody);
                    return null;
                });
                return promise;
            }
        }
    }
)
