<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html> 
<body>
  <h2>My Art Gallery</h2>
  <table border="1">
    <tr bgcolor="#9acd32">
      <th style="text-align:left">Title</th>
      <th style="text-align:left">Artist</th>
      <th style="text-align:left">Email</th>
      <th style="text-align:left">Country</th>
      <th style="text-align:left">Type</th>
      <!-- <th style="text-align:left">Image</th> -->
    </tr>
    <xsl:for-each select="catalog/cd">
    <tr>
      <td><xsl:value-of select="title"/></td>
      <td><xsl:value-of select="artist"/></td>
      <td><xsl:value-of select="email"/></td>
      <td><xsl:value-of select="country"/></td>
      <td><xsl:value-of select="type"/></td>
      <!-- <td><xsl:value-of select="/root/Image/img/@src"/></td> -->
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>

