package auth

import "errors"

const (
	ErrEmptyLogin    = "field login shouldn't be empty"
	ErrEmptyPassword = "field password shouldn't be empty"
	ErrEmptyName     = "field name shouldn't be empty"
)

func ValidateSignUpInput(input SignUpInput) error {
	if input.Login == "" {
		return errors.New(ErrEmptyLogin)
	}
	if input.Password == "" {
		return errors.New(ErrEmptyPassword)
	}
	if input.FirstName == "" {
		return errors.New(ErrEmptyName)
	}
	return nil
}

func ValidateSignInInput(input SignInInput) error {
	if input.Login == "" {
		return errors.New(ErrEmptyLogin)
	}
	if input.Password == "" {
		return errors.New(ErrEmptyPassword)
	}
	return nil
}
