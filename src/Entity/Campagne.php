<?php

namespace App\Entity;

use App\Repository\CampagneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CampagneRepository::class)
 */
class Campagne extends EntityRef
{
    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="campagne", cascade={"persist", "remove"})
     */
    private $tasks;

    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="campagne")
     */
    private $equipes;
    /**
     * @ORM\Column(type="json_array", nullable=true)
     * @var array $weeks
     */
    private  $weeks;
    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->equipes = new ArrayCollection();
        $this->weeks = [];
    }

    /**
     * @return Collection|Task[]
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $task->setCampagne($this);
            $this->tasks[] = $task;
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if($this->tasks->contains($task)){
            if ($task->getCampagne() === $this) {
                $task->setCampagne(null);
                $this->tasks->removeElement($task);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Equipe[]
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): self
    {
        if (!$this->equipes->contains($equipe)) {
            $this->equipes[] = $equipe;
            $equipe->setCampagne($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getCampagne() === $this) {
                $equipe->setCampagne(null);
            }
        }

        return $this;
    }

    /**
     * @return array
     */
    public function getWeeks(): array
    {
        return $this->weeks;
    }

    /**
     * @param array $weeks
     * @return Campagne
     */
    public function setWeeks(array $weeks): Campagne
    {
        $this->weeks = $weeks;
        return $this;
    }

    /**
     * @param mixed $tasks
     * @return Campagne
     */
    public function setTasks($tasks)
    {
        $this->tasks = $tasks;
        return $this;
    }





}
