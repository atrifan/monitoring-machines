Imports Microsoft.VisualBasic
Imports System
Imports System.Text
Imports System.IO
Imports System.Net
Imports System.Net.Sockets
Imports Microsoft.VisualBasic


Public Class CSocketClient
    Dim clientSocket As New System.Net.Sockets.TcpClient()
    Dim serverStream As NetworkStream

    'Connect
    Public Sub init(ByVal address As String, ByVal port As Integer)
        clientSocket.Connect(address, port)
    End Sub

    'Run once
    Public Sub runOnce()
        Dim serverStream As NetworkStream = clientSocket.GetStream()
        sendMSG("Message1 from Client$", serverStream)
        receiveMSG(serverStream)
    End Sub

    'Send msg
    Public Sub sendMSG(ByVal msg As String)
        Dim serverStream As NetworkStream = clientSocket.GetStream()
        Dim outStream As Byte() = System.Text.Encoding.ASCII.GetBytes(msg)
        serverStream.Write(outStream, 0, outStream.Length)
        serverStream.Flush()
    End Sub

    'Receive msg
    Public Sub receiveMSG()
        Dim inStream(10024) As Byte
        Dim buffSize As Integer = clientSocket.ReceiveBufferSize
        MsgBox("X")
        serverStream.Read(inStream, 0, buffSize)
        MsgBox("Y")
        Dim returndata As String = System.Text.Encoding.ASCII.GetString(inStream)
        MsgBox("Data from Server : " & returndata)
    End Sub
End Class
