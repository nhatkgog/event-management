CREATE DATABASE EventManagementDB
GO
USE EventManagementDB
GO

CREATE TABLE [User] (
                        id INT IDENTITY(1,1) PRIMARY KEY,
    fullName NVARCHAR(100)  NOT NULL,
    email NVARCHAR(100)     NOT NULL UNIQUE,
    password NVARCHAR(255)  NOT NULL,
    role NVARCHAR(20)       NOT NULL  -- 'Organizer' or 'Student'
    );


CREATE TABLE [Event] (
                         id INT IDENTITY(1,1) PRIMARY KEY,
    organizerId INT        NOT NULL  REFERENCES [User](id),
    title NVARCHAR(200)    NOT NULL,
    description NVARCHAR(MAX) NULL,
    category NVARCHAR(100) NULL,
    location NVARCHAR(200) NULL,
    eventDate DATE         NOT NULL,
    startTime TIME         NOT NULL,
    endTime TIME           NOT NULL,
    status NVARCHAR(20)    NOT NULL  -- e.g. 'Draft', 'Open', 'Closed'
    );


CREATE TABLE Registration (
                              userId INT            NOT NULL  REFERENCES [User](id),
                              eventId INT           NOT NULL  REFERENCES [Event](id),
                              isRegistered BIT      NOT NULL  DEFAULT 1,
                              isAttended BIT        NOT NULL  DEFAULT 0,
                              isCancelled BIT       NOT NULL  DEFAULT 0,
                              PRIMARY KEY (userId, eventId)
);


CREATE TABLE Notification (
                              id INT IDENTITY(1,1) PRIMARY KEY,
                              senderId INT          NOT NULL  REFERENCES [User](id),
                              receiverId INT        NOT NULL  REFERENCES [User](id),
                              title NVARCHAR(100)   NOT NULL,
                              content NVARCHAR(500) NOT NULL,
                              sentAt DATETIME       NOT NULL  DEFAULT GETDATE()
);

INSERT INTO [User](fullName, email, password, role) VALUES
    ('FPT University Event Team',   'events@fpt.edu.vn',      'Pass@123',    'Organizer'),
    ('Tran Thi Binh',                'DE120003tbinh@fpt.edu.vn','Student@123','Student'),
    ('Nguyen Van Can',               'DE120002vcan@fpt.edu.vn', 'Student@123','Student');
GO

INSERT INTO [Event](
  organizerId,
  title,
  description,
  category,
  location,
  eventDate,
  startTime,
  endTime,
  status
) VALUES (
  1,                                          -- FPT University Event Team
  'FPT University Open Day 2025',
  'Tham quan cơ sở vật chất, giao lưu cùng sinh viên và giảng viên.',
  'Open Day',
  'FPT University Da Nang Campus Hall',
  '2025-10-01',
  '08:00:00',
  '12:00:00',
  'Open'
);
GO

INSERT INTO Registration(userId, eventId, isRegistered, isAttended, isCancelled) VALUES
  (2, 1, 1, 0, 0),   -- Tran Thi Binh
  (3, 1, 1, 0, 0);   -- Nguyen Van Can
GO

INSERT INTO Notification(senderId, receiverId, title, content) VALUES
  (1, 2,
    'Reminder: FPT Open Day Tomorrow',
    'Nhắc bạn: Ngày mai 8:00 AM tại Campus Hall – đừng quên tham gia FPT Open Day 2025!'
  ),
  (1, 3,
    'Reminder: FPT Open Day Tomorrow',
    'Nhắc bạn: Ngày mai 8:00 AM tại Campus Hall – đừng quên tham gia FPT Open Day 2025!'
  );
GO
