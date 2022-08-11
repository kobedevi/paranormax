import {gql} from "@apollo/client";

//  Mutation to register a new user
export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $username: String!) {
        register(
            email: $email, 
            password: $password, 
            firstName: $firstName, 
            lastName: $lastName, 
            username: $username 
        ) {
            jwt
            jwtExpiresAt
            refreshToken
            refreshTokenExpiresAt
            schema
            user {
                id
                email
                firstName
                lastName
                username
            }
        }
    }
`;

export default REGISTER_USER;