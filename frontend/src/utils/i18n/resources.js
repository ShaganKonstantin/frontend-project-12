export const resources = {
  en: {
    translation: {
      nameLength: 'Must contain from 3 to 20 characters.',
      // Страница логина
      loginTitle: 'Log in',
      loginNamePlaceholder: 'Your nickname',
      loginPasswordPlaceholder: 'Password',
      loginButton: 'Log in',
      isLoggingButton: 'Logging in...',
      hasAccount: 'No account?',
      registration: 'Sign in',
      // Страница чата
      channels: 'Channels',
      inputPlaceholder: 'Enter your message...',
      logoutButton: 'Log out',
      // Страница с регистрацией
      registrationTitle: 'Sign in',
      registrationUsernamePlaceholder: 'User name',
      registrationPasswordPlaceholder: 'Password',
      confirmPassword: 'Confirm password',
      registrationButton: 'Sign in',
      // Модалка
      channelName: 'Channel name',
      channelMenu: 'Channel menu',
      // Модалка-кнопка отмены
      modalCancelButton: 'Cancel',
      // Модалка-кнопка отправки
      modalSendingButton: 'Sending...',
      modalSendButton: 'Send',
      // Модалка-добавить канал
      modalAddChTitle: 'Add channel',
      // Модалка-удалить канал
      modalDeleteChTitle: 'Delete channel',
      modalDeleteChConfirmation: 'Sure?',
      modalDeleteChButton: 'Delete',
      // Модалка-переименовать канал
      modalRenameChTitle: 'Rename channel',
      // Дропдаун для каналов
      dropdownDelete: 'Delete',
      dropdownRename: 'Rename',
      // Ошибки
      errors: {
        requiredField: 'Fill this field.',
        sendingError: 'Error sending message',
        saveChError: 'Saving channel error',
        // Ошибки в логине
        invalidCredentials: 'Wrong username or password',
        // loginUsernameMin: "Username must contain at least 5 characters.",
        // loginPasswordMin: "Password must contain at least 5 characters.",
        fillField: 'Fill this field',
        // Ошибки в регистрации
        registrationUsernameMin: 'Username must contain at least 3 characters.',
        registrationUsernameMax: 'Username must contain maximum 20 characters.',
        registrationPasswordMin: 'Password must contain at least 6 characters.',
        registrationPasswordMax: 'Password must contain maximum 20 characters.',
        passwordMatch: 'Passwords must match.',
        passwordConfirmation: 'Confirm your password.',
        userExists: 'User with this name already exists.',
        registrationError: 'Registration error.',
        sixCharsMin: 'Must contain at least 6 characters.',
        // Ошибки в модалках
        enterChName: 'Enter channel name.',
        // Ошибки при отправке/получении/сервера
        networkError: 'No internet connection.',
        serverError: 'Server error.',
        unauthorized: 'Authorization required.',
        channelsLoadError: 'Failed to load channels.',
        messagesLoadError: 'Failed to load messages.',
        channelAddError: 'Failed to add channel.',
        channelRenameError: 'Failed to rename channel.',
        channelRemoveError: 'Failed to remove channel.',
        messageSendError: 'Failed to send message.',
        socketConnectError: 'Chat connection error.',
        socketError: 'Chat error.',
        socketInitError: 'Chat initialization error.',
        socketReconnect: 'Reconnecting to chat...',
        socketReconnectFailed: 'Failed to reconnect to chat.',
        operationFailed: 'Operation failed.',
      },
      // Тосты
      channelCreated: 'Channel created.',
      channelRenamed: 'Channel renamed.',
      channelRemoved: 'Channel removed.',
      toastError: 'An error occured',
    },
  },
  ru: {
    translation: {
      nameLength: 'От 3 до 20 символов',
      // Страница логина
      loginTitle: 'Войти',
      loginNamePlaceholder: 'Ваш ник',
      loginPasswordPlaceholder: 'Пароль',
      loginButton: 'Войти',
      isLoggingButton: 'Вход...',
      hasAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      // Страница чата
      channels: 'Каналы',
      inputPlaceholder: 'Введите сообщение...',
      logoutButton: 'Выйти',
      // Страница с регистрацией
      registrationTitle: 'Регистрация',
      registrationUsernamePlaceholder: 'Имя пользователя',
      registrationPasswordPlaceholder: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registrationButton: 'Зарегистрироваться',
      // Модалка
      channelName: 'Имя канала',
      channelMenu: 'Управление каналом',
      // Модалка-кнопка отмены
      modalCancelButton: 'Отменить',
      // Модалка-кнопка отправки
      modalSendingButton: 'Отправляется...',
      modalSendButton: 'Отправить',
      // Модалка-добавить канал
      modalAddChTitle: 'Добавить канал',
      // Модалка-удалить канал
      modalDeleteChTitle: 'Удалить канал',
      modalDeleteChConfirmation: 'Уверены?',
      modalDeleteChButton: 'Удалить',
      // Модалка-переименовать канал
      modalRenameChTitle: 'Переименовать канал',
      // Дропдаун для каналов
      dropdownDelete: 'Удалить',
      dropdownRename: 'Переименовать',
      // Ошибки
      errors: {
        requiredField: 'Обязательное поле.',
        sendingError: 'Ошибка отправки сообщения.',
        saveChError: 'Ошибка при сохранении канала.',
        // Ошибки в логине
        invalidCredentials: 'Неверные имя пользователя или пароль',
        // loginUsernameMin: "Логин должен содержать минимум 5 символов.",
        // loginPasswordMin: "Пароль должен содержать минимум 5 символов.",
        fillField: 'Заполните поле.',
        // Ошибки в регистрации
        registrationUsernameMin: 'От 3 до 20 символов',
        registrationUsernameMax: 'От 3 до 20 символов',
        registrationPasswordMin: 'Не менее 6 символов',
        registrationPasswordMax: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
        passwordConfirmation: 'Подтвердите пароль',
        userExists: 'Такой пользователь уже существует',
        registrationError: 'Ошибка регистрации',
        sixCharsMin: 'Не менее 6 символов.',
        // Ошибки в модалках
        enterChName: 'Введите имя канала.',
        // Ошибки при отправке/получении/сервера
        networkError: 'Нет подключения к интернету.',
        serverError: 'Ошибка сервера.',
        unauthorized: 'Требуется авторизация.',
        channelsLoadError: 'Ошибка загрузки каналов.',
        messagesLoadError: 'Ошибка загрузки сообщений.',
        channelAddError: 'Не удалось создать канал.',
        channelRenameError: 'Не удалось переименовать канал.',
        channelRemoveError: 'Не удалось удалить канал.',
        messageSendError: 'Не удалось отправить сообщение.',
        socketConnectError: 'Ошибка подключения к чату.',
        socketError: 'Ошибка в чате.',
        socketInitError: 'Ошибка инициализации чата.',
        socketReconnect: 'Переподключение к чату...',
        socketReconnectFailed: 'Не удалось переподключиться к чату.',
        operationFailed: 'Ошибка выполнения операции.',
      },
      // Тосты
      channelCreated: 'Канал создан.',
      channelRenamed: 'Канал переименован.',
      channelRemoved: 'Канал удалён.',
      toastError: 'Произошла ошибка.',
    },
  },
}
