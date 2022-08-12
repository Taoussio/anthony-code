
const arr = [
    'hs_object_id',
    'hs_all_accessible_team_ids',
    'createdate',
    'secteur_d_activite',
    'days_to_close',
    'hs_total_deal_value',
    'hubspot_owner_id',
    'first_deal_created_date',
    'num_associated_deals',
    'hs_num_open_deals',
    'notes_last_updated',
    'recent_deal_close_date',
    'hs_all_team_ids',
    'hs_num_blockers',
    'hubspot_team_id',
    'num_contacted_notes',
    'hs_all_owner_ids',
    'date_de_signature',
    'hs_user_ids_of_all_owners',
    'hs_target_account_probability',
    'hs_num_decision_makers',
    'hubspot_owner_assigneddate',
    'hs_num_contacts_with_buying_roles',
    'date_de_validation',
    'num_notes',
    'recent_deal_amount',
    'total_revenue'
]

arr.sort()

console.log(JSON.stringify(arr, null, 4))
