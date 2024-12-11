package models

data class User(
    val email: String? = null,
    val password: String? = null,
    val achievements: Achievements? = null
)

{
    data class Achievements(
        val breathingExercise: Boolean = false,
        val motivationalStory: Boolean = false,
        val resistCraving: Boolean = false
    )

}
