<%@ Page Language="vb" AutoEventWireup="false" Inherits="System.Web.UI.Page" %>

<script runat="server">

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Const API_KEY As String = "YOUR_API_KEY" '// "39e4b42635576e1589b7f5df3f454ed4"

        If Context.Request.ContentLength = 0 Then
            Exit Sub
        End If

        Dim dataXml As String = New IO.StreamReader(Context.Request.InputStream, New System.Text.UTF8Encoding(False)).ReadToEnd()
        Dim crossUrl As String = Request.Headers("crossUrl")
        Dim crossMethod As String = Request.Headers("crossMethod")
        Dim crossContentType As String = Request.Headers("crossContentType")

        If String.IsNullOrEmpty(dataXml) Then
            Throw New Exception("No content send in request")
        End If

        If String.IsNullOrEmpty(crossUrl) Then
            Throw New Exception("No cross URL")
        End If

        Dim resp As String = postData(dataXml, crossUrl, crossMethod, crossContentType, API_KEY)
        Context.Response.ContentType = "text/xml; charset=utf-8"
        Context.Response.Write(resp)
        Context.Response.End()

    End Sub

    Private Function postData(data As String, url As String, method As String, crossContentType As String, apiKey As String) As String


        Dim req As System.Net.WebRequest = System.Net.WebRequest.Create(url)
        Dim bytes As Byte()

        Dim encoding As New Text.UTF8Encoding(False)
        bytes = encoding.GetBytes(data)

        If String.IsNullOrEmpty(method) Then
            req.Method = "POST"
        Else
            req.Method = method
        End If

        req.ContentType = crossContentType

        ' change this per client 
        req.Headers.Add("apikey", apiKey)

        Dim xmlDoc As New System.Xml.XmlDocument()

        Try

            Dim stream As System.IO.Stream

            If req.Method.Equals("POST", StringComparison.OrdinalIgnoreCase) Then
                req.ContentLength = bytes.Length
                stream = req.GetRequestStream()
                stream.Write(bytes, 0, bytes.Length)
                stream.Close()
            End If

            Dim resp As System.Net.WebResponse = req.GetResponse()
            stream = resp.GetResponseStream()
            xmlDoc.Load(stream)
        Catch ex As Exception
            Return "<Error>" & ex.Message & "</Error>"
        End Try

        Return xmlDoc.InnerXml

    End Function

	</script>

<!DOCTYPE html>



<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
