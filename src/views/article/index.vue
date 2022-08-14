<template>
  <div class="article">
    <!-- 导航栏 -->
    <van-nav-bar
                 class="nav-bar"
                 title="黑马头条"
                 left-arrow
                 @click="$router.back()" />

    <!-- 正在加载中 -->
    <div v-if="loading" class="loading-wrap">
      <van-loading vertical>加载中</van-loading>
    </div>

    <!-- 文章详情 -->
    <div v-else-if="article.title" class="article-detail-wrap">
      <!-- 正文部分 -->
      <div class="article-main-wrap">
        <!-- 文章标题 -->
        <h3 class="artilce-title">{{ article.title }}</h3>
        <!-- 作者信息 -->
        <div class="author-info">
          <van-cell :title="article.aut_name" :label="timeFormatterFromNow(article.pubdate)">
            <template #icon>
              <div class="author-avatar-wrap">
                <van-image
                           round
                           fit="cover"
                           class="author-avatar"
                           :src="article.aut_photo" />
              </div>
            </template>
            <template #value>
              <follow-user
                           v-model:is-followed="article.is_followed"
                           :author-id="article.aut_id">
              </follow-user>
            </template>
          </van-cell>
        </div>
        <!-- 文章内容 -->
        <div ref="articleContent" class="article-content markdown-body" v-html="article.content"></div>
        <!-- 正文结束分割线 -->
        <van-divider class="divider">正文结束</van-divider>
        <!-- 评论列表 -->
        <comment-list
                      ref="commentListRef"
                      :source="articleId"
                      @reply-click="onReplyClick">
        </comment-list>
      </div>
      <!-- 文章底部 -->
      <div class="article-bottom-wrap">
        <van-button
                    class="comment-btn"
                    type="default"
                    round
                    @click="isPostShow = true">
          写评论
        </van-button>
        <van-icon
                  name="comment-o"
                  :badge="totalCommentCount"
                  color="#777">
        </van-icon>
        <collect-article
                         v-model:is-collected="article.is_collected"
                         :articleId="articleId">
        </collect-article>
        <like-article
                      v-model:attitude="article.attitude"
                      :articleId="articleId">
        </like-article>
        <van-icon
                  name="share-o"
                  color="#777">
        </van-icon>
      </div>
      <!-- 弹出层 -->
      <!-- 发表评论 -->
      <van-popup v-model:show="isPostShow" position="bottom">
        <comment-post :target="articleId" @on-post-comment="onPostComment"></comment-post>
      </van-popup>
      <!-- 查看回复 -->
      <van-popup
                 style="height:100%"
                 v-model:show="isReplyShow"
                 position="bottom">
        <comment-reply
                       v-if="isReplyShow"
                       :comment="currentComment"
                       @comment-reply-close="isReplyShow = false">
        </comment-reply>
      </van-popup>
    </div>
    <!-- 加载失败：404 -->
    <div v-else-if="errStatus === 404" class="error-wrap">
      <van-icon name="failure" />
      <p class="text">该资源不存在或已删除！</p>
    </div>

    <!-- 加载失败：其他未知错误（例如网络原因或服务器异常） -->
    <div v-else class="error-wrap">
      <van-icon name="failure" />
      <p class="text">内容加载失败！</p>
      <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
    </div>

  </div>
</template>

<script setup>
import { getArticleById } from '@/api/article'
import { getComments } from '@/api/comment'
import { timeFormatterFromNow } from '@/utils/dayjs'
import { ImagePreview, Toast } from 'vant'
import FollowUser from '../../components/follow-user/index.vue'
import CollectArticle from '@/components/collect-article/index.vue';
import LikeArticle from '@/components/like-article/index.vue';
import CommentList from '@/components/comment-list/index.vue';
import CommentPost from '../../components/comment-post/index.vue';
import CommentReply from '@/components/comment-reply/index.vue';

const props = defineProps({
  articleId: {
    type: [Number, String],
    required: true
  }
})

const article = ref({})
const loading = ref(false)
const errStatus = ref(0)
const articleContent = ref(null)
const totalCommentCount = ref(0)
const isPostShow = ref(false)
const commentListRef = ref(null)
const isReplyShow = ref(false)
const currentComment = ref({})

provide('articleId', props.articleId)

loadArticle()

async function loadArticle() {
  loading.value = true
  try {
    const res = await getArticleById(props.articleId)
    // if (Math.random() > 0.3) {
    //   //模拟网络错误
    //   throw new Error
    // }
    article.value = res.data.data

    nextTick(() => {
      // console.log(111, articleContent.value)
      nextTick(() => {
        // console.log(111, articleContent.value)
        handleImagePreview()
      })
    })
    // setTimeout(() => {
    //   console.log(222, articleContent.value)
    // }, 0);
  } catch (err) {
    errStatus.value = err?.response?.status
  }
  loading.value = false
}

function handleImagePreview() {
  const images = []
  articleContent.value.querySelectorAll('img').forEach((img, index) => {
    images.push(img.src)
    img.addEventListener('click', () => {
      ImagePreview({
        images,
        startPosition: index,
      })
    })
  })
}

//提交评论后
function onPostComment(newComment) {
  //关闭弹出层
  isPostShow.value = false
  //如果发布成功，将发布内容显示到列表顶部
  if (newComment) commentListRef.value.list.unshift(newComment)
}

//点击评论回复按钮后
function onReplyClick(comment) {
  currentComment.value = comment

  isReplyShow.value = true
}

//初始化评论数量
getComments({
  type: 'a',
  source: props.articleId
}).then(res => {
  // console.log(666, res)
  totalCommentCount.value = res.data.data.total_count
})
  .catch(err => {
    Toast.fail('获取评论数量失败')
  })

</script>

<style lang="less" scoped>
@import './github-markdown.css';

.article {
  // padding-top: 92px;
  // padding-bottom: 88px;

  // .nav-bar {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  .article-main-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }

  .loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }

  .temp {
    width: 200px;
    height: 200px;
  }

  /deep/.article-detail-wrap {
    .divider {
      background-color: #fff;
      margin: 0;
      padding: 32px 0;
    }

    .artilce-title {
      margin: 0;
      padding: 28px 40px;
      background-color: #fff;
    }

    .article-content {
      padding: 0 40px;
    }

    .author-info {
      .author-avatar-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 17px;

        .author-avatar {
          width: 70px;
          height: 70px;
        }
      }

      .van-cell__title {
        font-size: 24px;
      }

      .van-cell__label {
        font-size: 23px;
      }

      .follow-text {
        font-size: 27px;
      }

      .van-cell__value {
        display: flex;
        justify-content: end;
        align-items: center;
      }
    }

  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  /deep/.article-bottom-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;

    .van-icon {
      font-size: 40px;
    }

    .comment-btn {
      width: 282px;
      height: 46px;
      color: #a7a7a7;

      .van-button__content {
        font-size: 30px;
        justify-content: left;
      }
    }
  }
}
</style>