import { Lesson } from '../../types';

export const GAMEDEV_LESSONS: Lesson[] = [
  {
    id: 'gd-01',
    moduleId: 'gd-math-physics',
    trackId: 'gamedev',
    title: 'Векторы и Скалярное произведение (Dot Product)',
    description: 'Определение поля зрения (FOV), направлений и расчет освещения.',
    durationMinutes: 30,
    xpReward: 90,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Скалярное произведение в GameDev

$$A \\cdot B = A_x B_x + A_y B_y + A_z B_z$$
Если результат $> 0$ — объект находится спереди от взгляда персонажа.`,
    codeSnippet: `const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;`,
    codeTask: {
      initialCode: `function isFront(forward, dir) {
  // Вычислите скалярное произведение и верните true, если оно > 0
  const dot = (forward.x * dir.x) + (forward.y * dir.y) + (forward.z * dir.z);
  return dot > 0;
}`,
      solution: `function isFront(forward, dir) {
  const dot = (forward.x * dir.x) + (forward.y * dir.y) + (forward.z * dir.z);
  return dot > 0;
}`,
      language: 'javascript',
      hints: ['dot = forward.x * dir.x + forward.y * dir.y + forward.z * dir.z'],
      testCases: [{ description: 'dot product', validationRegex: 'forward\\.x\\s*\\*\\s*dir\\.x' }]
    }
  },
  {
    id: 'gd-02',
    moduleId: 'gd-unity',
    trackId: 'gamedev',
    title: 'Unity 3D: C# Контроллер и FixedUpdate',
    description: 'Физика Rigidbody и плавное перемещение без привязки к частоте кадров.',
    durationMinutes: 35,
    xpReward: 95,
    difficulty: 'intermediate',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### Физика в Unity C#

Физические вызовы Rigidbody обрабатываются исключительно в \`FixedUpdate()\`.`,
    codeSnippet: `rb.velocity = moveDir * speed;`,
    codeTask: {
      initialCode: `using UnityEngine;

public class PlayerMove : MonoBehaviour {
    public Rigidbody rb;
    public float speed = 5f;
    
    public void ApplyMovement(Vector3 dir) {
        // Задайте rb.velocity = dir.normalized * speed;
        rb.velocity = dir.normalized * speed;
    }
}`,
      solution: `using UnityEngine;

public class PlayerMove : MonoBehaviour {
    public Rigidbody rb;
    public float speed = 5f;
    
    public void ApplyMovement(Vector3 dir) {
        rb.velocity = dir.normalized * speed;
    }
}`,
      language: 'csharp',
      hints: ['rb.velocity = dir.normalized * speed;'],
      testCases: [{ description: 'velocity и normalized', validationRegex: 'rb\\.velocity' }]
    }
  },
  {
    id: 'gd-03',
    moduleId: 'gd-unreal',
    trackId: 'gamedev',
    title: 'Unreal Engine 5: C++ Gameplay Framework',
    description: 'Иерархия AActor, APawn, ACharacter и макросы UPROPERTY / UFUNCTION.',
    durationMinutes: 40,
    xpReward: 110,
    difficulty: 'advanced',
    type: 'interactive_code',
    order: 1,
    theoryContent: `### UE5 C++ Архитектура

Система рефлексии Unreal Engine связывает C++ свойства с редактором через макрос \`UPROPERTY()\`.`,
    codeSnippet: `UPROPERTY(EditAnywhere, BlueprintReadWrite) float Health = 100.0f;`,
    codeTask: {
      initialCode: `#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "Hero.generated.h"

UCLASS()
class AHero : public ACharacter {
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere)
    float MaxSpeed = 600.0f;
};`,
      solution: `#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "Hero.generated.h"

UCLASS()
class AHero : public ACharacter {
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere)
    float MaxSpeed = 600.0f;
};`,
      language: 'cpp',
      hints: ['UPROPERTY(EditAnywhere) float MaxSpeed = 600.0f;'],
      testCases: [{ description: 'UPROPERTY', validationRegex: 'UPROPERTY' }]
    }
  }
];
