package network

import models.AchievementsResponse
import models.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.PUT

interface UserService {

    @POST("/api/users/signup")
    fun signUp(@Body user: User?): Call<Void?>?

    @POST("/api/users/login")
    fun login(@Body user: User?): Call<User?>?

    @POST("/api/users/progress")
    fun fetchProgress(@Body user: User?): Call<User?>?

    @POST("/api/users/achievements")
    fun fetchAchievements(@Body requestBody: Map<String, String>): Call<AchievementsResponse>

    @PUT("/api/users/achievements")
    fun updateAchievements(@Body user: User?): Call<Void?>?
}
