export const BASE_API_URL = 'https://amchatd1.areteminds.com/api/v1/iam'
export const BASE_DOC_API_URL = 'https://amchatd1.areteminds.com/api/v1/doc/'
export const BASE_ORG_API_URL = 'https://amchatd1.areteminds.com/api/v1/org'
export const BASE_USER_IMAGE_URL = 'https://medicalpublic.s3.amazonaws.com/'
export const CHAT_GETSESSION = 'http://127.0.0.1:5000/api/v1/sessions'
export const BASE_API_URL_V1 = 'https://amchatd1.areteminds.com/api/v1'

export const SIGNUP_ENDPOINT = '/user/signup'
export const SIGNIN_ENDPOINT = '/user/signin'
export const RECOVERY_PASSWORD_ENDPOINT = '/user/verification/reset'
export const CONTACT_US_ENDPOINT = '/user/contactUs'
export const DOCUMENT_ENDPOINT = '/document'
export const USER_LIST_ENDPOINT = '/user/userlist'
export const DUMMY_CHAT_ENDPOINT = '/user/chat/dummy'
export const VERIFY_API = BASE_API_URL + '/user/verify'

export const MAIL_RECOVERY_PASSWORD_ENDPOINT = '/user/verification'

export const USER_PROFILE = `${BASE_API_URL}/user`
export const UPDATE_ADMIN_USER = `${BASE_API_URL}/user`
export const GET_ACTIVE_USERS = `${BASE_API_URL}/user/recently_visited_users`
export const PROFILE_URL = 'https://medicalpublic.s3.amazonaws.com/'

export const UserAccount = ''
export const OrgAdminAccount = 'ORG_ADMIN'
export const SuperAdminAccount = 'SUPER_ADMIN'

export const AM_CHAT = 'AM-Chat'
// export const CHAT = 'http://127.0.0.1:5000/api/v1/query';

export const CHAT_OF_SESSION =
    'http://127.0.0.1:5000/api/v1/sessions/query?session='

export const PLACEHODER_IMAGE =
    'https://medicalpublic.s3.amazonaws.com/AMCHAT/UserDP_1708667530992.jpg'
export const PLAN_DETAILS =
    'https://amchatd1.areteminds.com/api/v1/subscription'
export const PLAN_DETAILS_BY_ID = PLAN_DETAILS + '?org_id='
export const LIST_OF_CHAT_SESSIONS = BASE_API_URL_V1 + '/sessions'
export const DEFAULT_QUESTIONS = BASE_API_URL_V1 + '/doc'
export const CHAT = BASE_API_URL_V1 + '/query'
export const INDIVIDUAL_SESSION_CHAT =
    BASE_API_URL_V1 + '/sessions/query?session='
export const USAGE_SUBSCRIPTION =
    'https://amchatd1.areteminds.com/api/v1/subscription?org_id=1'

export const BUTTON_COLOUR = '#6366F1'
