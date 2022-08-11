import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
    mutation Authenticate($email:String!, $password:String!) {
        authenticate(
            email: $email,
            password: $password
        ) {
            jwt
            jwtExpiresAt
            refreshToken
            refreshTokenExpiresAt
            user {
                id
                email
                username
                fullName
            }
        }
    }
`;

export default GET_LOGIN