package handlers

import (
	"time"
	"strconv"
	"net/http"
	. "develops.nebulas.io/server/models"
	"github.com/gin-gonic/gin"
)


// Docs routers
func Docs(c *gin.Context) {
	TitleURL := c.Param("title_url")

	docs := PlatformDocs{TitleURL:TitleURL}
	row, err := docs.GetDocs()
	if err != nil {
		 c.JSON(http.StatusOK, gin.H{
			"data": nil,
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"code" : 0,
		"msg" : "success",
		"data": row,
	})
}

// UpdateDocs put
func UpdateDocs(c *gin.Context) {

	DocsID, _ := strconv.Atoi(c.Param("docs_id"))
	DocsContent := c.PostForm("docs_content")
	DocsTitle := c.PostForm("docs_title")
	DocsTitleURL := c.PostForm("docs_title_url")

	docs := PlatformDocs{ID:DocsID,Title:DocsTitle, TitleURL:DocsTitleURL, Content:DocsContent}
	rs, err := docs.UpdateDocs()

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
		   "data": nil,
	   })
	   return
   }

	c.JSON(http.StatusOK, gin.H{
		"code" 	: 0,
		"msg"	: "success",
		"data" 	: rs,
	})
}
// CreateDocs post
func CreateDocs(c *gin.Context) {
	Title 		:= c.PostForm("title")
	TitleURL 	:= c.PostForm("title_url")
	Content 	:= c.PostForm("content")
	CategoryID,_ := strconv.Atoi(c.PostForm("category_id"))
	CreateTime  := time.Now()
	docs := PlatformDocs{Title:Title, TitleURL: TitleURL, Content:Content, CategoryID:CategoryID, CreateTime:CreateTime}
	rs, err := docs.CreateDocs()

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
		   "data": nil,
	   })
	   return
   }
	c.JSON(http.StatusOK, gin.H{
		"code" 	: 0,
		"msg"	: rs,
		"data" 	: "",
	})
}

