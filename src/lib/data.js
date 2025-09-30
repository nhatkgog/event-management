// Mock data for the application
export const clubs = [
  {
    id: 1,
    name: "Code Champions",
    category: "TECH",
    description:
      "Câu lạc bộ lập trình hàng đầu của trường. Tham gia các cuộc thi, workshop và xây dựng các dự án công nghệ.",
    members: 15,
    events: 8,
    successRate: "95%",
    image: "/coding-programming-tech.jpg",
  },
  {
    id: 2,
    name: "AI Innovation Club",
    category: "TECH",
    description: "Khám phá thế giới trí tuệ nhân tạo và machine learning. Tập trung vào nghiên cứu và ứng dụng AI.",
    members: 12,
    events: 5,
    successRate: "92%",
    image: "/artificial-intelligence-ai-robot.jpg",
  },
  {
    id: 3,
    name: "Vovinam Club",
    category: "SPORT",
    description:
      "Câu lạc bộ võ thuật truyền thống Việt Nam. Tham gia giải đấu, rèn luyện sức khỏe và xây dựng tinh thần đồng đội.",
    members: 20,
    events: 3,
    successRate: "98%",
    image: "/martial-arts-vovinam-sport.jpg",
  },{
    id: 4,
    name: "Sport Club",
    category: "SPORT",
    description:
      "Câu lạc bộ thể thao đa dạng với các môn thể thao khác nhau. Tổ chức các giải đấu và hoạt động rèn luyện sức khỏe.",
    members: 18,
    events: 6,
    successRate: "94%",
    image: "/martial-arts-vovinam-sport.jpg",
    fullDescription:
      "Sport Club là nơi tập hợp những sinh viên yêu thích thể thao và muốn duy trì lối sống khỏe mạnh. Chúng tôi tổ chức các hoạt động đa dạng từ bóng đá, bóng rổ, cầu lông đến các môn võ thuật truyền thống.",
    activities: ["Bóng đá", "Bóng rổ", "Cầu lông", "Võ thuật", "Chạy bộ"],
    meetingTime: "Thứ 3, Thứ 5 - 17:00-19:00",
    location: "Sân thể thao trường",
    membersList: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        role: "Chủ nhiệm",
        avatar: "/member1.jpg",
      },
      {
        id: 2,
        name: "Trần Thị B",
        role: "Phó chủ nhiệm",
        avatar: "/member2.jpg",
      },
      { id: 3, name: "Lê Văn C", role: "Thành viên", avatar: "/member3.jpg" },
      { id: 4, name: "Phạm Thị D", role: "Thành viên", avatar: "/member4.jpg" },
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Giải đấu bóng đá sinh viên",
        date: "2025-10-15",
        location: "Sân vận động trường",
        description: "Một giải đấu bóng đá giao hữu giữa các khoa.",
      },
      {
        id: 2,
        title: "Workshop Võ thuật Vovinam",
        date: "2025-11-02",
        location: "Nhà đa năng A",
        description: "Buổi chia sẻ kỹ năng võ thuật và rèn luyện thể chất.",
      },
    ],
  }
]

export const events = [
  {
    id: 1,
    title: "RESEARCH CONNECT 2025",
    description:
      "Những giây phút cùng thăng và hỗi hợp sáng sủa ra tiến đầu trường học thuật, sân chơi nghiên cứu khoa học tầm nhất mành dành cho sinh viên Trường F.",
    date: "2025-01-28",
    time: "19:30",
    categoryId: {  name: "ACADEMIC" },
    status: "upcoming",
    participants: 0,
    maxParticipants: 100,
    image: "/research-conference-academic.jpg",
    location: "Phòng hội thảo B201",
    organizer: "CLB Nghiên cứu khoa học",
    tags: ["Nghiên cứu", "Khoa học", "Học thuật"],
  },
  {
    id: 2,
    title: "Hackathon 2025",
    description:
      "Thử thách bản thân với 48 giờ coding marathon cùng các developer hàng đầu. Giải thưởng hấp dẫn và cơ hội networking với các chuyên gia trong ngành.",
    date: "2025-02-15",
    time: "09:00",
    categoryId: {  name: "TECH" },
    status: "upcoming",
    participants: 45,
    maxParticipants: 100,
    image: "/hackathon-coding-programming.jpg",
    location: "Lab máy tính A101",
    organizer: "CLB Lập trình",
    tags: ["Lập trình", "Hackathon", "Công nghệ"],
  },
  {
    id: 3,
    title: "Cuộc thi lập trình Hackathon",
    description:
      "Thử thách bản thân với 48 giờ coding marathon cùng các developer hàng đầu. Giải thưởng hấp dẫn và cơ hội networking với các chuyên gia trong ngành.",
    date: "2025-01-15",
    time: "08:00",
    categoryId: {  name: "TECH" },
    status: "registered",
    participants: 28,
    maxParticipants: 30,
    image: "/coding-programming-tech.jpg",
    location: "CLB Lập trình",
    organizer: "CLB Lập trình",
    tags: ["Lập trình", "Thi đấu"],
  },
  {
    id: 4,
    title: "Giải bóng đá sinh viên",
    description: "Tham gia bóng đá 11 người giữa các khoa, các câu lạc bộ. Cơ hội thể hiện tài năng và tình đoàn kết.",
    date: "2025-01-20",
    time: "15:00",
    categoryId: {name: "SPORT" },
    status: "registered",
    participants: 22,
    maxParticipants: 22,
    image: "/martial-arts-vovinam-sport.jpg",
    location: "CLB Thể thao",
    organizer: "CLB Thể thao",
    tags: ["Thể thao", "Bóng đá"],
  },
  {
    id: 5,
    title: "Đêm nhạc acoustic",
    description:
      "Một đêm nhạc đầy cảm xúc với những giai điệu acoustic nhẹ nhàng. Không gian ấm cúng để gần gũi sau những ngày học tập căng thẳng.",
    date: "2025-01-25",
    time: "19:00",
    categoryId: {  name: "ART" },
    status: "registered",
    participants: 156,
    maxParticipants: 200,
    image: "/placeholder.svg?key=music",
    location: "CLB Âm nhạc",
    organizer: "CLB Âm nhạc",
    tags: ["Âm nhạc", "Acoustic"],
  },
  {
    id: 6,
    title: "Workshop kỹ năng mềm",
    description:
      "Nâng cao kỹ năng giao tiếp, làm việc nhóm và thuyết trình. Được hướng dẫn bởi các chuyên gia và leader có kinh nghiệm.",
    date: "2025-02-01",
    time: "14:00",
    categoryId: {  name: "ACADEMIC" },
    status: "registered",
    participants: 45,
    maxParticipants: 50,
    image: "/placeholder.svg?key=workshop",
    location: "CLB Học thuật",
    organizer: "CLB Học thuật",
    tags: ["Kỹ năng mềm", "Workshop"],
  },
  {
    id: 7,
    title: "Cuộc thi AI và Machine Learning",
    description:
      "Thử sức với các dự án AI thực tế. Tổ chức computer vision đến natural language processing. Cơ hội học hỏi từ các mentor công nghệ.",
    date: "2025-02-10",
    time: "10:00",
    categoryId: {  name: "TECH" },
    status: "registered",
    participants: 32,
    maxParticipants: 40,
    image: "/artificial-intelligence-ai-robot.jpg",
    location: "CLB AI Research",
    organizer: "CLB AI Research",
    tags: ["AI", "Machine Learning"],
  },
  {
    id: 8,
    title: "Triển lãm nghệ thuật sinh viên",
    description:
      "Trưng bày các tác phẩm nghệ thuật của sinh viên. Từ hội họa, nhiếp ảnh đến điêu khắc. Không gian sáng tạo và cảm hứng.",
    date: "2025-02-05",
    time: "16:00",
    categoryId: { name: "ART" },
    status: "registered",
    participants: 89,
    maxParticipants: 100,
    image: "/placeholder.svg?key=art",
    location: "CLB Mỹ thuật",
    organizer: "CLB Mỹ thuật",
    tags: ["Nghệ thuật", "Triển lãm"],
  },
];


export const testimonials = [
  {
    id: 1,
    name: "Xavier",
    avatar: "/male-student-avatar.png",
    rating: 5,
    comment:
      "Thanks to this project we discovered and realized our brand was so much more than what we thought. We are really happy about the results.",
  },
  {
    id: 2,
    name: "Mr. Thiện",
    avatar: "/teacher-avatar-male.jpg",
    rating: 5,
    comment:
      "Not only the project inspired us about our brand, but the actual results we were able to accomplish were amazing.",
  },
  {
    id: 3,
    name: "Donald Trump",
    avatar: "/student-avatar.png",
    rating: 5,
    comment:
      "This boy is really good and I am excited about this work. I think it was the best I have seen in my years.",
  },
]

export const categories = [
  { id: "all", label: "Tất cả", color: "bg-red-500" },
  { id: "TECH", label: "Công nghệ", color: "bg-blue-500" },
  { id: "SPORT", label: "Thể thao", color: "bg-green-500" },
  { id: "ART", label: "Nghệ thuật", color: "bg-purple-500" },
  { id: "ACADEMIC", label: "Học thuật", color: "bg-orange-500" },
  { id: "CULTURE", label: "Văn hóa", color: "bg-teal-500" },
]

export const schedules = [
  { id: 1, eventId: 1, title: "Đăng ký và check-in", time: "08:00 - 08:30", order: 1 },
  { id: 2, eventId: 1, title: "Khai mạc và giới thiệu", time: "08:30 - 09:00", order: 2 },
  { id: 3, eventId: 1, title: "Hoạt động chính", time: "09:00 - 16:00", order: 3 },
  { id: 4, eventId: 1, title: "Tổng kết và trao giải", time: "16:00 - 17:00", order: 4 },

  { id: 5, eventId: 2, title: "Khởi động Hackathon", time: "09:00 - 09:30", order: 1 },
  { id: 6, eventId: 2, title: "Coding marathon", time: "09:30 - 18:00", order: 2 },
  { id: 7, eventId: 2, title: "Pitching & Trao giải", time: "18:00 - 20:00", order: 3 },
];


// lib/data.js

export const registrations = [
  {
    _id: "8",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User A
    eventId: 1,
    status: "Registered",
    registeredAt: "2025-01-10T08:30:00Z",
    isCheckedIn: true,
    isCheckedOut: false,
    notes: "Đăng ký sớm.",
  },
  {
    _id: "7",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User A
    eventId: 2,
    status: "Attended",
    registeredAt: "2025-01-12T09:00:00Z",
    attendedAt: "2025-02-15T09:10:00Z",
    isCheckedIn: true,
    isCheckedOut: true,
    notes: "Tham gia đầy đủ.",
  },
  {
    _id: "6",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User B
    eventId: 3,
    status: "Cancelled",
    registeredAt: "2025-01-05T10:00:00Z",
    cancelledAt: "2025-01-10T12:00:00Z",
    isCheckedIn: false,
    isCheckedOut: false,
    notes: "Bận lịch học, hủy đăng ký.",
  },
  {
    _id: "5",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User B
    eventId: 4,
    status: "Attended",
    registeredAt: "2025-01-06T15:00:00Z",
    attendedAt: "2025-01-20T15:05:00Z",
    isCheckedIn: true,
    isCheckedOut: true,
    notes: "Có mặt đúng giờ.",
  },
  {
    _id: "4",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User C
    eventId: 5,
    status: "NoShow",
    registeredAt: "2025-01-18T14:00:00Z",
    isCheckedIn: false,
    isCheckedOut: false,
    notes: "Đăng ký nhưng không đến.",
  },
  {
    _id: "3",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User C
    eventId: 6,
    status: "Registered",
    registeredAt: "2025-01-22T11:00:00Z",
    isCheckedIn: false,
    isCheckedOut: false,
  },
  {
    _id: "2",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User A
    eventId: 7,
    status: "Registered",
    registeredAt: "2025-01-25T09:00:00Z",
    isCheckedIn: false,
    isCheckedOut: false,
  },
  {
    _id: "1",
    userId: "user_33FO9mAMBFzKlgctv1JALdQve3g", // User B
    eventId: 8,
    status: "Registered",
    registeredAt: "2025-01-27T13:00:00Z",
    isCheckedIn: false,
    isCheckedOut: false,
  },
];

