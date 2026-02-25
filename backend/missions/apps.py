from django.apps import AppConfig


class MissionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'missions'

    def ready(self):
        import missions.models  # noqa: F401 — ensures signals are registered
