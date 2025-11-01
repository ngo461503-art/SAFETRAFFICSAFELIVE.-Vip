"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, MessageCircle, BookOpen, Lightbulb, Send, X, MessageSquare } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Mình là cố vấn an toàn giao thông. Bạn có câu hỏi gì về lái xe, luật giao thông hay an toàn đường bộ không?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false)
  const [floatingMessages, setFloatingMessages] = useState<Message[]>([
    {
      id: "float-1",
      text: "Xin chào! Có gì tôi có thể giúp bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [floatingInputValue, setFloatingInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setTimeout(() => {
      const botMessage: Message = {
        id: Math.random().toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 600)
  }

  const handleSendFloatingMessage = () => {
    if (!floatingInputValue.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      text: floatingInputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setFloatingMessages((prev) => [...prev, userMessage])
    setFloatingInputValue("")

    setTimeout(() => {
      const botMessage: Message = {
        id: Math.random().toString(),
        text: generateBotResponse(floatingInputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setFloatingMessages((prev) => [...prev, botMessage])
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Floating Chat Button */}
      {!isFloatingChatOpen && (
        <button
          onClick={() => setIsFloatingChatOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40 flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="text-sm font-semibold hidden sm:inline">Chat ngay</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isFloatingChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-yellow-200 flex flex-col z-50 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <div>
                <h3 className="font-semibold text-sm">Cố vấn An toàn</h3>
                <p className="text-xs text-blue-100">Sẵn sàng giúp bạn</p>
              </div>
            </div>
            <button
              onClick={() => setIsFloatingChatOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {floatingMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-yellow-100 text-gray-800 rounded-bl-none border border-yellow-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-yellow-200 flex gap-2">
            <Input
              placeholder="Hỏi gì đó..."
              value={floatingInputValue}
              onChange={(e) => setFloatingInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendFloatingMessage()}
              className="text-sm bg-white border-yellow-200"
            />
            <Button onClick={handleSendFloatingMessage} size="sm" className="bg-blue-500 hover:bg-blue-600 px-3">
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-red-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/traffic-safety-icon.jpg"
                alt="An toàn giao thông"
                width={64}
                height={64}
                className="rounded-lg bg-white/20 p-2"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Cố vấn An toàn Giao thông</h1>
              <p className="text-yellow-100 text-sm">Hướng dẫn lái xe an toàn và tuân thủ luật giao thông</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-yellow-200">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span className="hidden sm:inline">Bảo vệ Môi trường</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Lightbulb size={18} />
              <span className="hidden sm:inline">Tips Lái xe</span>
            </TabsTrigger>
            <TabsTrigger value="laws" className="flex items-center gap-2">
              <BookOpen size={18} />
              <span className="hidden sm:inline">Luật Giao thông</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {environmentCards.map((card, idx) => (
                <Card key={idx} className="border-green-200 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-40 w-full bg-gradient-to-br from-green-100 to-emerald-100">
                    <Image
                      src={`/.jpg?key=vfnvn&height=160&width=400&query=${card.imageQuery}`}
                      alt={card.title}
                      width={400}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                    <CardTitle className="text-green-900 flex items-center gap-2">
                      <span className="text-2xl">{card.icon}</span>
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{card.description}</p>
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                      <p className="text-xs font-semibold text-green-900 mb-2">Lợi ích:</p>
                      <ul className="space-y-1">
                        {card.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {tips.map((tip, idx) => (
                <Card key={idx} className="border-yellow-200 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-40 w-full bg-gradient-to-br from-green-100 to-yellow-100">
                    <Image
                      src={`/.jpg?key=98460&height=160&width=400&query=${tip.imageQuery}`}
                      alt={tip.title}
                      width={400}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50 border-b border-yellow-200">
                    <CardTitle className="text-green-900 flex items-center gap-2">
                      <span className="text-2xl">{tip.icon}</span>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                    <ul className="mt-3 space-y-2">
                      {tip.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-600 font-bold mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Laws Tab */}
          <TabsContent value="laws" className="mt-6 space-y-4">
            {laws.map((law, idx) => (
              <Card key={idx} className="border-red-200 hover:shadow-lg transition-shadow overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-red-50">
                    <Image
                      src={`/.jpg?key=kg4ai&height=96&width=96&query=${law.imageQuery}`}
                      alt={law.title}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <h3 className="text-lg font-semibold text-red-900">{law.title}</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{law.description}</p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded mb-2">
                      <p className="text-xs font-semibold text-red-900 mb-1">Điều luật:</p>
                      <p className="text-xs text-gray-700">{law.regulation}</p>
                    </div>
                    {law.penalty && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-2 rounded">
                        <p className="text-xs font-semibold text-yellow-900 mb-1">Hình phạt:</p>
                        <p className="text-xs text-gray-700">{law.penalty}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Cố vấn An toàn Giao thông | Luôn lái xe an toàn, tuân thủ luật lệ
          </p>
        </div>
      </footer>
    </div>
  )
}

const environmentCards = [
  {
    icon: "🌍",
    title: "Giảm khí thải CO2",
    description: "Lái xe an toàn giúp tiết kiệm nhiên liệu và giảm lượng khí thải.",
    imageQuery: "eco-friendly-driving-reduce-emissions",
    benefits: [
      "Giảm consumption xăng 10-15%",
      "Giảm khí thải carbon",
      "Tiết kiệm chi phí nhiên liệu",
      "Bảo vệ khí hậu toàn cầu",
    ],
  },
  {
    icon: "🌱",
    title: "Lái xe thẳng tĩnh",
    description: "Tránh tăng tốc đột ngột và phanh gấp rút ngắn tuổi thọ engine.",
    imageQuery: "smooth-driving-eco-friendly",
    benefits: ["Kéo dài tuổi thọ động cơ", "Giảm hao mòn công cụ", "Tiết kiệm chi phí bảo dưỡng", "Tốt cho môi trường"],
  },
  {
    icon: "♻️",
    title: "Tái chế và bảo trì",
    description: "Xe được bảo dưỡng tốt ít ô nhiễm hơn và dễ tái chế.",
    imageQuery: "vehicle-maintenance-recycling",
    benefits: ["Bảo dưỡng định kỳ", "Thay dầu đúng thời hạn", "Kiểm tra hệ thống xả khí", "Giảm rác thải công nghiệp"],
  },
  {
    icon: "🚗",
    title: "Lái xe hợp lý",
    description: "Sử dụng công cộng hoặc share car giúp giảm tổng số xe trên đường.",
    imageQuery: "carpooling-public-transport",
    benefits: ["Giảm tắc đường", "Tiết kiệm xăng dầu", "Giảm ô nhiễm không khí", "Xây dựng cộng đồng"],
  },
]

const tips = [
  {
    icon: "🚗",
    title: "Kiểm tra xe trước khi lên đường",
    description: "Đây là bước quan trọng để đảm bảo an toàn khi lái xe.",
    imageQuery: "car-inspection-checklist",
    points: [
      "Kiểm tra bánh xe, lưu lượng khí",
      "Kiểm tra hệ thống phanh và đèn",
      "Kiểm tra gương chiếu hậu",
      "Đầy đủ nước làm mát động cơ",
    ],
  },
  {
    icon: "⏱️",
    title: "Tốc độ phù hợp",
    description: "Tốc độ là yếu tố chính gây ra tai nạn giao thông.",
    imageQuery: "safe-driving-speed",
    points: [
      "Tuân thủ biển báo tốc độ",
      "Giảm tốc độ trong thành phố",
      "Cẩn thận vào ban đêm",
      "Điều chỉnh tốc độ theo thời tiết",
    ],
  },
  {
    icon: "😴",
    title: "Tránh lái xe khi mệt mỏi",
    description: "Người lái mệt mỏi có thời gian phản ứng chậm hơn.",
    imageQuery: "rest-break-while-driving",
    points: [
      "Nghỉ ngơi 15 phút sau 2 giờ lái",
      "Không lái đêm khuya nếu mệt",
      "Hạn chế uống cà phê nhiều",
      "Ngủ đủ trước khi lên đường",
    ],
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Bảo vệ hành khách",
    description: "Tất cả hành khách cần được bảo vệ an toàn.",
    imageQuery: "passenger-safety-seatbelt",
    points: [
      "Yêu cầu mọi người thắt dây an toàn",
      "Trẻ em phải ngồi ghế an toàn",
      "Không để trẻ em vừa mặt ngoài",
      "Tắt điện thoại khi lái xe",
    ],
  },
]

const laws = [
  {
    icon: "⚖️",
    title: "Luật về thắt dây an toàn",
    description: "Luật bắt buộc tất cả những người trên xe phải thắt dây an toàn.",
    imageQuery: "seatbelt-safety-law",
    regulation: "Theo Luật Giao thông Đường bộ, người lái và hành khách phải thắt dây an toàn.",
    penalty: "Phạt tiền từ 100.000 - 200.000 đồng",
  },
  {
    icon: "🍷",
    title: "Lái xe khi say rượu",
    description: "Điều này là hành vi cực kỳ nguy hiểm và bị pháp luật nghiêm cấm.",
    imageQuery: "drunk-driving-prohibited",
    regulation: "Lái xe khi có nồng độ cồn trong máu từ 0,05% trở lên là vi phạm pháp luật.",
    penalty: "Phạt tiền 16-20 triệu đồng, tước giấy phép 16-24 tháng",
  },
  {
    icon: "📱",
    title: "Sử dụng điện thoại khi lái xe",
    description: "Sử dụng điện thoại di động khi lái xe rất nguy hiểm.",
    imageQuery: "no-phone-while-driving",
    regulation: "Người lái xe không được cầm máy điện thoại, máy phát hoặc máy thu thanh.",
    penalty: "Phạt tiền 100.000 - 200.000 đồng",
  },
  {
    icon: "🚦",
    title: "Vượt đèn đỏ",
    description: "Vượt đèn đỏ là một trong những vi phạm giao thông phổ biến.",
    imageQuery: "red-light-traffic-rules",
    regulation: "Người lái phải dừng hoàn toàn khi gặp đèn đỏ.",
    penalty: "Phạt tiền 300.000 - 500.000 đồng, tước giấy phép 1 tháng",
  },
]

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("xin chào") || lowerMessage.includes("hello")) {
    return "Xin chào! Mình rất vui được gặp bạn. Mình có thể giúp bạn về lái xe an toàn, luật giao thông, hoặc bất kỳ câu hỏi nào về an toàn đường bộ. Bạn muốn biết về cái gì?"
  }

  if (lowerMessage.includes("nồng độ cồn") || lowerMessage.includes("say rượu")) {
    return "Rất quan trọng! Lái xe say rượu là rất nguy hiểm. Nếu bạn đã uống rượu, hãy gọi taxi hoặc nhờ người khác lái. Theo pháp luật, người lái có nồng độ cồn từ 0,05% trở lên sẽ bị phạt 16-20 triệu đồng và tước giấy phép 16-24 tháng."
  }

  if (lowerMessage.includes("dây an toàn") || lowerMessage.includes("seatbelt")) {
    return "Dây an toàn là thiết bị cứu mạng! Luôn thắt dây an toàn trước khi khởi động xe. Nó giảm nguy cơ tử vong đến 50%. Nhớ yêu cầu tất cả hành khách trên xe cũng thắt dây an toàn nhé!"
  }

  if (lowerMessage.includes("tốc độ")) {
    return "Tốc độ phù hợp rất quan trọng! Hãy tuân thủ biển báo giới hạn tốc độ và điều chỉnh tốc độ theo điều kiện đường bộ (mưa, đêm tối, khu dân cư...). Nhớ: không vội vàng, đến nơi an toàn là mục tiêu!"
  }

  if (lowerMessage.includes("điện thoại") || lowerMessage.includes("phone")) {
    return "Tuyệt đối không sử dụng điện thoại khi lái xe! Điều này rất nguy hiểm vì nó làm mất tập trung. Nếu cần, hãy dừng xe an toàn rồi trả lời. Người vi phạm sẽ bị phạt 100.000 - 200.000 đồng."
  }

  if (lowerMessage.includes("mệt") || lowerMessage.includes("buồn ngủ")) {
    return "Nếu bạn cảm thấy mệt, hãy dừng xe lại! Nghỉ ngơi 15-20 phút là rất cần thiết. Không bao giờ lái xe khi mệt, vì thời gian phản ứng sẽ chậm hơn. An toàn của bạn và người khác là ưu tiên hàng đầu!"
  }

  return "Cảm ơn câu hỏi của bạn! Tôi có thể giúp bạn về: luật giao thông, mẹo lái xe an toàn, quy tắc giao thông, và những điều cần chú ý khi lái xe. Bạn có thể hỏi cụ thể hơn nhé!"
}
