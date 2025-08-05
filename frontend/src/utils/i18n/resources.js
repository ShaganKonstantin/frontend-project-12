export const resources = {
  en: {
    translation: {
      // Страница логина
      loginTitle: "Log in",
      loginNamePlaceholder: "Your nickname",
      loginPasswordPlaceholder: "Password",
      loginButton: "Log in",
      isLoggingButton: "Logging in...",
      hasAccount: "No account?",
      registration: "Sign in",
      // Страница чата
      channels: "Channels",
      inputPlaceholder: "Enter your message...",
      logoutButton: "Log out",
      // Страница с регистрацией
      registrationTitle: "Sign in",
      registrationUsernamePlaceholder: "User name",
      registrationPasswordPlaceholder: "Password",
      confirmPassword: "Confirm password",
      registrationButton: "Sign in",
      // Модалка-кнопка отмены
      modalCancelButton: "Cancel",
      //Модалка-кнопка отправки
      modalSendButton: "Send",
      // Модалка-добавить канал
      modalAddChTitle: "Add channel",
      // Модалка-удалить канал
      modalDeleteChTitle: "Delete channel",
      modalDeleteChConfirmation: "Sure?",
      modalDeleteChButton: "Delete",
      // Модалка-переименовать канал
      modalRenameChTitle: "Rename channel",
      // Дропдаун для каналов
      dropdownDelete: "Delete",
      dropdownRename: "Rename", 
      // Ошибки
      errors: {
        requiredField: "Fill this field.",
        sendingError: "Error sending message",
        saveChError: "Saving channel error",
        // Ошибки в логине
        loginUsernameMin: "Username must contain at least 5 characters.",
        loginPasswordMin: "Password must contain at least 5 characters.",
        fillField: "Fill this field",
        // Ошибки в регистрации
        registrationUsernameMin: "Username must contain at least 3 characters.",
        registrationUsernameMax: "Username must contain maximum 20 characters.",
        registrationPasswordMin: "Password must contain at least 6 characters.",
        registrationPasswordMax: "Password must contain maximum 20 characters.",
        passwordMatch: "Passwords must match.",
        passwordConfirmation: "Confirm your password.",
        userExists: "User with this name already exists.",
        registrationError: "Registration error.",
        // Ошибки в модалках
        modalLength: "Must contain from 3 to 20 characters.",
        enterChName: "Enter channel name.",
      }
    }
  },
  ru: {
    translation: {
      // Страница логина
      loginTitle: "Войти",
      loginNamePlaceholder: "Ваш ник",
      loginPasswordPlaceholder: "Пароль",
      loginButton: "Войти",
      isLoggingButton: "Вход...",
      hasAccount: "Нет аккаунта?",
      registration: "Регистрация",
      // Страница чата
      channels: "Каналы",
      inputPlaceholder: "Введите сообщение...",
      logoutButton: "Выйти",
      // Страница с регистрацией
      registrationTitle: "Регистрация",
      registrationUsernamePlaceholder: "Имя пользователя",
      registrationPasswordPlaceholder: "Пароль",
      confirmPassword: "Подтвердите пароль",
      registrationButton: "Зарегистрироваться",
      // Модалка-кнопка отмены
      modalCancelButton: "Отменить",
      //Модалка-кнопка отправки
      modalSendButton: "Отправить",
      // Модалка-добавить канал
      modalAddChTitle: "Добавить канал",
      // Модалка-удалить канал
      modalDeleteChTitle: "Удалить канал",
      modalDeleteChConfirmation: "Уверены?",
      modalDeleteChButton: "Удалить",
      // Модалка-переименовать канал
      modalRenameChTitle: "Переименовать канал",
      // Дропдаун для каналов
      dropdownDelete: "Удалить",
      dropdownRename: "Переименовать", 
      // Ошибки
      errors: {
        requiredField: "Обязательное поле.",
        sendingError: "Ошибка отправки сообщения.",
        saveChError: "Ошибка при сохранении канала.",
        // Ошибки в логине
        loginUsernameMin: "Логин должен содержать минимум 5 символов.",
        loginPasswordMin: "Пароль должен содержать минимум 5 символов.",
        fillField: "Заполните поле.",
        // Ошибки в регистрации
        registrationUsernameMin: "Имя пользователя должно содержать минимум 3 символа.",
        registrationUsernameMax: "Имя пользователя должно содержать максимум 20 символов.",
        registrationPasswordMin: "Пароль должен содержать минимум 6 символов.",
        registrationPasswordMax: "Пароль должен содержать максимум 20 символов.",
        passwordMatch: "Пароли должны совпадать.",
        passwordConfirmation: "Подтвердите пароль.",
        userExists: "Пользователь с таким именем существует.",
        registrationError: "Ошибка регистрации.",
        // Ошибки в модалках
        modalLength: "От 3 до 20 смиволов.",
        enterChName: "Введите имя канала.",
      }
    }
  }
}